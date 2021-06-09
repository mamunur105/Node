const User = require('../models/User')
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
	let user = new User({
		username,
		email,
		password
	})
	try{
		let createdUser = await user.save()
		console.log("User Created Successfull")
		res.render('pages/auth/signup', { title: "Create New Account"})
	} catch(e){
		console.log( e )
		next( e )
	}
}
exports.loginGetController = ( req, res, next) => {

}
exports.loginPostController = ( req, res, next) => {

}

exports.logoutController = ( req, res, next) => {

}