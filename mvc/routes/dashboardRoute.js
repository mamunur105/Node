const router = require('express').Router()
const {
	isAuthenticated
} = require('../middleware/authMiddleware')

const {
	dashboardGetController,
	dashboardPostController
} = require('../controllers/dashboardController')

router.get('/', isAuthenticated , dashboardGetController );
// router.get('/', dashboardPostController );


module.exports = router