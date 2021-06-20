const User = require('../models/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const errorFormater = require('../utils/validationErrorFormatter')
const Flash = require('../utils/Flash')
exports.signupGetController = ( req, res, next) => {
	res.render('pages/auth/signup',
		{
			title: "Create New Account",
			error:{},
			value:{},
			flashMessage: Flash.getMessage( req )
		}
	);
}
exports.signupPostController = async ( req, res, next) => {
	let {
		username,
		email,
		password,
		confirmpassword,
	} = req.body
	let errors = validationResult( req ).formatWith( errorFormater );

	if( !errors.isEmpty() ){
		req.flash('fail', 'Please Check Your form')
		return 	res.render('pages/auth/signup', {
			title: "Create New Account", 
			error: errors.mapped(),
			value:{
				username, email, password
			},
			flashMessage: Flash.getMessage( req )
		});
	}

	try{
		let hassPassword = await bcrypt.hash(password, 11)
		let user = new User({
			username,
			email,
			password: hassPassword
		})
		await user.save()
		// console.log("User Created Successfull", createdUser)
		// res.render('pages/auth/login', { title: "Login to your Account"})
		req.flash('success', 'User Created Successfull')
		return res.redirect('/auth/login')
	} catch(e){
		next( e )
	}
}
exports.loginGetController =  ( req, res, next) => {
	res.render('pages/auth/login',
		{
			title: "Login to your Account",
			error:{},
			value:{},
			flashMessage: Flash.getMessage( req )
		}
	)
}
exports.loginPostController = async ( req, res, next) => {
	let {
		email,
		password,
	} = req.body
	let errors = validationResult( req ).formatWith( errorFormater );
	if( !errors.isEmpty() ){
		req.flash('fail', 'Please Check Your form')
		return 	res.render('pages/auth/login', {
			title: "Login to your Account",
			error: errors.mapped(),
			value:{
				email, password
			},
			flashMessage: Flash.getMessage( req )
		});
	}
	try{
		let user = await User.findOne({email});
		if( !user ){
			req.flash('fail', 'Invalid Credential')
			return res.redirect('/auth/login')
		}
		let match = await bcrypt.compare(password, user.password )
		if( !match ){
			req.flash('fail', 'Invalid Credential')
			return res.redirect('/auth/login')
		}
		req.session.isLoggedIn = true
		req.session.user = user
		req.session.save( err => {
			if( err ){
				return next( err )
			}
			req.flash('success', 'Successfully Logedin')
			return res.redirect('/dashboard')
		})
	} catch(e){
		next( e )
	}
}

exports.logoutController = ( req, res, next) => {
	req.flash('success', 'Logedout! Login Again')
	req.session.destroy( err => {
		if( err ){
			return next( err )
		}else{
			return res.redirect('/auth/login')
		}
	})
}