const {Schema, model } = require('mongoose')
const Profile = require('./Profile')
const userSchema = new Schema({
	nome: {
		type: String,
		trim: true,
		maxlength: 30,
		required: true
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	profile: {
		tyoe: Schema.Types.ObjectId,
		ref: Profile
	}

}, {
	timestamps: true
})

const User = model('User', userSchema)
module.exports = User