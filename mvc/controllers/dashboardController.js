const Flash = require('../utils/Flash')
const Profile = require('../models/Profile')
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
	// console.log( errors )
	if( !errors.isEmpty() ){
		req.flash('fail', 'Please Check Your form')
		return res.render('pages/dashboard/create-profile',
				{
					title: "Create Profile",
					error: errors.mapped(),
					value:{},
					flashMessage: Flash.getMessage( req )
				}
			)
		// return res.redirect('/dashboard/create-profile')
	}

}
exports.editfileGetController = async ( req, res, next) => { next() }
exports.editfilePostController = async ( req, res, next) => { next() }