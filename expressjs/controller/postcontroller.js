exports.getAllPost = (req, res) => {
	res.send('Get post')
}

exports.singlePost = (req, res) => {
	res.send(`Single post ${req.params.postId}`)
}

exports.createNewPost = (req, res) => {
	res.send('Submit post')
}


exports.updatePost =  (req, res) => {
	res.send(`Put post ${req.params.postId}`)
}

exports.deletePost =  (req, res) => {
	res.send(`Delete post ${req.params.postId}`)
}