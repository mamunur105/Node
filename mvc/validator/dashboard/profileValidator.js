const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = [
	body('name').not().isEmpty().withMessage('Name Cant be empty')
	.isLength( {max:50} ).withMessage('Name cant be More then 50')
	,
	body('title').not().isEmpty().withMessage('Title Cant be empty')
	.isLength( {max:100} ).withMessage('Title cant be More then 50'),

	body('bio').not().isEmpty().withMessage('Bio Cant be empty')
	.isLength( {max:500} ).withMessage('Title cant be More then 50'),

	body('website')
		.isURL().withMessage('Please Provide Valid Url'),

	body('facebook')
		.isURL().withMessage('Please Provide Valid Url'),

	body('twitter')
		.isURL().withMessage('Please Provide Valid Url'),

	body('github')
		.isURL().withMessage('Please Provide Valid Url'),
	
]