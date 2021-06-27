const router = require('express').Router()
const {
	isAuthenticated
} = require('../middleware/authMiddleware')
const {
	uploadProfilePics
} = require('../controllers/uploadController')

const upload = require('../middleware/uploadMiddleware')


router.post('/profilePics' , upload.single('uploaded_file') , uploadProfilePics )


module.exports = router