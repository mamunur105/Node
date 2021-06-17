const router = require('express').Router()
// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');
const flash = require('../utils/Flash')
router.get('/validator' , ( req, res, next ) =>{
	console.log( flash.getMessage(req) )
	res.render('playground/signup' ,{title: "Validator Playground" } )
} )
router.post('/validator' ,[
	check('username')
		.not()
		.isEmpty()
		.withMessage('Username Can\'t be Empty')
		.isLength( {max: 15 } )
		.withMessage('Username Can\'t greater than 15 Character')
		.trim(),
	check('email')
		.isEmail()
		.withMessage('Invalid Email')
		.normalizeEmail(),
	check('password').custom( pass => {
		if( pass.length < 5 ){
			throw new Error('Password Must Be Greater then 5 Characters')
		}
		return true
	}),
	check('confirmpassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password confirmation is incorrect');
		}
		return true
	})

], ( req, res, next ) =>{
	let errors = validationResult(req);
	// const formatter = (error) =>  error.msg
	// console.log( errors.formatWith(formatter).mapped() )
	// console.log( req.body.username, req.body.email )
	if( ! errors.isEmpty() ){
		req.flash('fail', 'There is Some error')
	}else{
		req.flash('sucess', 'Sucess')
	}
	res.redirect('/playground/validator')

} )


module.exports = router