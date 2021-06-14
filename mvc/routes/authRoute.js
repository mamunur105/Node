const router = require('express').Router()
const signUpValidator = require('../validator/auth/signupvalidator')

const {
	signupGetController,
	signupPostController,
	loginGetController,
	loginPostController,
	logoutController,
} = require('../controllers/authController')


router.get('/signup', signupGetController)
router.post('/signup', signUpValidator , signupPostController)

router.get('/login', loginGetController)
router.post('/login', loginPostController)

router.get('/logout', logoutController)

module.exports = router