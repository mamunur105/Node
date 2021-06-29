const Flash = require('../utils/Flash')
const Profile = require('../models/Profile')
const User = require('../models/User')
const { validationResult } = require('express-validator')
const errorFormater = require('../utils/validationErrorFormatter')
exports.dashboardGetController = async ( req, res, next) => {
	try{
		let profile = await Profile.findOne( {
			user: req.session.user._id
		} )
		if( profile ){
			return res.render('pages/dashboard/dashboard',
				{
					title: "Dashboard",
					flashMessage: Flash.getMessage( req )
				}
			)
		}
		return res.redirect('/dashboard/create-profile')
	}catch ( e ){
		next( e )
	}
	
}

exports.createProfileGetController = async ( req, res, next) => {
	try{
		
		let profile = await Profile.findOne( {
			user: req.session.user._id
		} )
		if( profile ){
			return res.redirect('/dashboard/edit-profile')
		}
		return res.render('pages/dashboard/create-profile',
			{
				title: "Create Profile",
				error: {},
				value:{},
				flashMessage: Flash.getMessage( req )
			}
		)
	}catch ( e ){
		next( e )
	}
	
}

exports.createProfilePostController = async ( req, res, next) => { 
	let errors = validationResult( req ).formatWith( errorFormater )
	let {
		name,
		title,
		bio,
		website,
		facebook,
		twitter,
		github
	} = req.body
	console.log( errors )
	if( !errors.isEmpty() ){
		req.flash('fail', 'Please Check Your form')
		return res.render('pages/dashboard/create-profile',
			{
				title: "Create Profile",
				error: errors.mapped(),
				value:{
					name,
					title,
					bio,
					website,
					facebook,
					twitter,
					github
				},
				flashMessage: Flash.getMessage( req )
			}
		)
		
	}

	try{
		let profile = new Profile({
			user: req.user._id,
			name,
			title,
			bio,
			profilePic: req.user.profilePic,
			links:{
				website: website ||  '',
				facebook: facebook ||  '',
				twitter: twitter ||  '',
				github: github ||  ''
			},
			posts: [],
			bookmarks: []
		})
		let createprofile = await profile.save()
		await User.findOneAndUpdate(
			{_id: req.user._id},
			{ $set: { profile: createprofile._id } }
		)
		req.flash('success', 'Profile Created Successfull')
		return res.redirect('/dashboard')
	} catch(e){
		next( e )
	}


}
exports.editfileGetController = async ( req, res, next) => { next() }
exports.editfilePostController = async ( req, res, next) => { next() }