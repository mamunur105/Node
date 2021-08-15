const { body } = require('express-validator')
const cheerio = require('cheerio');

module.exports = [
	body('title').not().isEmpty().withMessage('Title Cant be empty')
	.isLength( {max:100} ).withMessage('Title cant be More then 100')
	.trim()
	,
	body('body').not().isEmpty().withMessage('Body Cant be empty')
	.custom( value => {
		let node = cheerio.load( value );
		let text = node.text();
		if( text.length > 5000 ){
			throw new Error('Body cant be more then 5000 chars')
		}
		return true
	})
	

]