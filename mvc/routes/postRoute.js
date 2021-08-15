const router = require('express').Router()

const postValidator = require('../validator/dashboard/post/postValidator')

const {
	createPostGetController,
	createPostPostController
} = require('../controllers/postController')

const {
	isAuthenticated
} = require('../middleware/authMiddleware')


router.get('/create', isAuthenticated,  createPostGetController)
router.post('/create', isAuthenticated, postValidator, createPostPostController)

module.exports = router