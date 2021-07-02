const router = require('express').Router()
const {
	createPostGetController,
} = require('../controllers/postController')

const {
	isAuthenticated
} = require('../middleware/authMiddleware')


router.get('/post', isAuthenticated,  createPostGetController)

module.exports = router