const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = [
	body('username')
		.isLength({min:2, max: 15}).withMessage('Username Must Be Between 2 to 15 Character')
		.custom( async username => {
			let user = await User.findOne( { username } )
			if( user ){
				return Promise.reject('Username Already Exist')
			}
			return true
		})
		.trim(),
	body('email')
		.isEmail().withMessage('Please Privide a valid email')
		.custom( async email => {
			let user = await User.findOne( { email } )
			if( user ){
				return Promise.reject('Email Already Exist')
			}
			return true
		})
		.normalizeEmail(),
	body('password')
		.isLength({ min: 5 }).withMessage('Your Password Must be Greater Than 5 Chars')
		,
	body('confirmPassword')
		.isLength({ min: 5 }).withMessage('Your Password Must be Greater Than 5 Chars')
		.custom( (confirmPassword, {req}) => {
			if( confirmPassword !== req.body.password ){
				throw new Error('Password Does not match')
			}
			return true
		})
]