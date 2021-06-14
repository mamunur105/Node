const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = [
	body('email')
		.isEmail().withMessage('Please Provide Correct Email')
		.custom( async email => {
			let user = await User.findOne( { email } )
			if( ! user ){
				return Promise.reject('Please Provide Correct Email')
			}
			return true
		}),
	body('password')
		.not().isEmpty().withMessage('Password Can\'t Be empty')

]