const router =  require('express').Router();
const {
	getAllPost,
	singlePost,
	createNewPost,
	updatePost,
	deletePost
} = require('../controller/postcontroller');
router.get('/', getAllPost )
router.get('/:postId', singlePost )
router.post('/', createNewPost )

router.put('/:postId', updatePost)
router.delete('/:postId', deletePost)


module.exports = router