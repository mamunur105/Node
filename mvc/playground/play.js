const router = require('express').Router()
const upload = require('../middleware/uploadMiddleware')
router.get('/play' , ( req, res, next ) =>{
	res.render('playground/play' ,{
		title: "Play",
		flashMessage: {}
	})
} )
router.post('/play' , upload.single('uploaded_file') ,( req, res, next ) =>{
	if( req.file ){
		console.log( req.file )
	}
	res.render('playground/play' ,{
		title: '',
		flashMessage: {}
	} )
} )
module.exports = router