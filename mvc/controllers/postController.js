const Flash = require('../utils/Flash')
const Profile = require('../models/Profile')
const User = require('../models/User')
const { validationResult } = require('express-validator')
const errorFormater = require('../utils/validationErrorFormatter')


exports.createPostGetController = ( req, res, next) => {
	res.render('pages/dashboard/post/createPost',
		{
			title: "Add New Post",
			error:{},
			value:{},
			flashMessage: Flash.getMessage( req )
		}
	);
}

exports.createPostPostController = ( req, res, next) => {
	let errors = validationResult( req ).formatWith( errorFormater )
	console.log( errors.mapped() );
	next()
}