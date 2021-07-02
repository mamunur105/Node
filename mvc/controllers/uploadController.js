const User = require('../models/User')
const Profile = require('../models/Profile')
const fs = require('fs')
exports.uploadProfilePics = async (req, res, next) => {
	if( req.file ){
		try{
			let oldProfilePics = req.user.profilePics
			let profile = await Profile.findOne({ user: req.user._id })
			let profilePics = `/uploads/${req.file.filename}`
			if( profile ){
				await Profile.findOneAndUpdate(
					{user: req.user._id},
					{ $set: { profilePics } }
				)
			}
			await User.findOneAndUpdate(
				{ _id: req.user._id },
				{$set: { profilePics } }
			)
			if( oldProfilePics  !== '/uploads/avatar.png' ){
				fs.unlink(`public${oldProfilePics}`,  err => {
					if( err ){
						console.log( err )
					}
				})
			}
			res.status(200).json({ profilePics })
		
		}catch( e ){
			res.status(500).json({
				profilePics: req.user.profilePics
			})
		}
	}else{
		res.status(500).json({
			profilePics: req.user.profilePics
		})
	}
}

exports.removeProfilePic =  (req, res, next) =>{
	try{

		let profilePics = `/uploads/avatar.png`
		let currentProfilePics = req.user.profilePics
	
		fs.unlink(`public${currentProfilePics}`, async ( err ) => {
			let profile = await Profile.findOne({ user: req.user._id })
			if( profile ){
				if( profile ){
					await Profile.findOneAndUpdate(
						{user: req.user._id},
						{ $set: { profilePics } }
					)
				}
			}
			await User.findOneAndUpdate(
				{ _id: req.user._id },
				{$set: { profilePics } }
			)
		})
		res.status(200).json({ profilePics })
	}catch( e ){
		console.log( e )
		res.status(500).json({
			message: 'Can\'t Remove Profile pics'
		})
	}
}

exports.postImageUploadController = async (req, res, next) => {
	if( req.file ){
	
	}
	next()
}
