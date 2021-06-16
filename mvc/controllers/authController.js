const User = require('../models/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const errorFormater = require('../utils/validationErrorFormatter')
exports.signupGetController = ( req, res, next) => {
	res.render('pages/auth/signup', { title: "Create New Account", error:{}, value:{} });
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
		return 	res.render('pages/auth/signup', {
			title: "Create New Account", 
			error: errors.mapped(),
			value:{
				username, email, password
			}
		});
	}

	try{
		let hassPassword = await bcrypt.hash(password, 11)
		let user = new User({
			username,
			email,
			password: hassPassword
		})
		let createdUser = await user.save()
		console.log("User Created Successfull", createdUser)
		res.render('pages/auth/login', { title: "Login to your Account"})
	} catch(e){
		console.log( e )
		next( e )
	}
}
exports.loginGetController =  ( req, res, next) => {
	console.log( "Message " , req.session )
	res.render('pages/auth/login', { title: "Login to your Account", error:{}, value:{} })
}
exports.loginPostController = async ( req, res, next) => {
	let {
		email,
		password,
	} = req.body
	let errors = validationResult( req ).formatWith( errorFormater );
	if( !errors.isEmpty() ){
		return 	res.render('pages/auth/login', {
			title: "Login to your Account",
			error: errors.mapped(),
			value:{
				email, password
			}
		});
	}
	try{
		let user = await User.findOne({email});
		if( !user ){
			return res.json({
				message: 'Invalid Credential'
			})
		}
		let match = await bcrypt.compare(password, user.password )
		if( !match ){
			return res.json({
				message: 'Invalid Credential'
			})
		}
		req.session.isLoggedIn = true
		req.session.user = user
		req.session.save( err => {
			if( err ){
				console.log( err )
				next( err )
			}
			return res.redirect('/dashboard')
		})
	} catch(e){
		console.log( e )
		next( e )
	}
}

exports.logoutController = ( req, res, next) => {
	req.session.destroy( err => {
		if( err ){
			console.log( err )
			return next( err )
		}else{
			return res.redirect('/auth/login')
		}
	})
}