const User = require('../models/User')
const bcrypt = require('bcrypt')
exports.signupGetController = ( req, res, next) => {
	res.render('pages/auth/signup', { title: "Create New Account"});
}
exports.signupPostController = async ( req, res, next) => {
	let {
		username,
		email,
		password,
		confirmpassword,
	} = req.body
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

	res.render('pages/auth/login', { title: "Login to your Account"})
}
exports.loginPostController = async ( req, res, next) => {
	let {
		email,
		password,
	} = req.body

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

		// let createdUser = await user.save()
		console.log("Login Successfull", user)
		res.render('pages/auth/login', { title: "Login to your Account"})
	} catch(e){
		console.log( e )
		next( e )
	}
}

exports.logoutController = ( req, res, next) => {

}