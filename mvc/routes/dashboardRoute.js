const router = require('express').Router()
const {
	isAuthenticated
} = require('../middleware/authMiddleware')

const {
	dashboardGetController,
	createProfileGetController,
	createProfilePostController,
	editfileGetController,
	editfilePostController
} = require('../controllers/dashboardController')

router.get('/', isAuthenticated , dashboardGetController );

router.get('/create-profile', isAuthenticated , createProfileGetController );
router.post('/create-profile', isAuthenticated , createProfilePostController );

router.get('/edit-profile', isAuthenticated , editfileGetController  );
router.post('/edit-profile', isAuthenticated , editfilePostController  );

// router.get('/', dashboardPostController );


module.exports = router