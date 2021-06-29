const { body } = require('express-validator')
const validator = require('validator')
const User = require('../../models/User')

const linkValidator = value => {
	if( value ){
		if( !validator.isURL( value ) ){
			throw new Error('Please Provide Valid Url')
		}
	}
	return true
}
module.exports = [
	body('name').not().isEmpty().withMessage('Name Cant be empty')
	.isLength( {max:50} ).withMessage('Name cant be More then 50')
	.trim()
	,
	body('title').not().isEmpty().withMessage('Title Cant be empty')
	.isLength( {max:100} ).withMessage('Title cant be More then 100')
	.trim()
	,

	body('bio').not().isEmpty().withMessage('Bio Cant be empty')
	.isLength( {max:500} ).withMessage('Bio can\'t be More then 500')
	.trim()
	,

	body('website').custom( linkValidator ),

	body('facebook').custom( linkValidator ),

	body('twitter').custom( linkValidator ),

	body('github').custom( linkValidator )
	
]

