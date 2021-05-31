const router =  require('express').Router();
const {
	login,
	logout,
	signup
} = require('../controller/usercontroller')
router.get('/login', login)
router.get('/logout', logout)
router.get('/signup', signup)

module.exports = router