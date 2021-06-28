const router = require('express').Router()
const {
	isAuthenticated
} = require('../middleware/authMiddleware')
const {
	uploadProfilePics,
	removeProfilePic
} = require('../controllers/uploadController')

const upload = require('../middleware/uploadMiddleware')


router.post('/profilePics', isAuthenticated,  upload.single('uploaded_file') , uploadProfilePics )
router.delete('/profilePics' , isAuthenticated , removeProfilePic )


module.exports = router