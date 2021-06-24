const Flash = require('../utils/Flash')
const Profile = require('../models/Profile')

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

exports.createProfilePostController = async ( req, res, next) => { next() }
exports.editfileGetController = async ( req, res, next) => { next() }
exports.editfilePostController = async ( req, res, next) => { next() }