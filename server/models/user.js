const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new Schema({
	model: { type: String, default: 'User' },
	username: { type: String, required: true, unique: true, minlength: 5, maxlength: 25 },
	password: { type: String, required: true, minlength: 8, maxlength: 1024 },
	name: {
		prefix: { type: String, minlength: 2, maxlength: 10 },
		first: { type: String, required: true, minlength: 1, maxlength: 25 },
		middle: { type: String, minlength: 1, maxlength: 50 },
		last: { type: String, required: true, minlength: 1, maxlength: 50 },
		suffix: { type: String, minlength: 2, maxlength: 10 }
	},
	location: {
		city: { type: String, minlength: 1, maxlength: 50 },
		state: { type: String, minlength: 2, maxlength: 20 },
		country: { type: String, required: true, minlength: 2, maxlength: 25 }
	},
	email: { type: String, required: true, minlength: 5, maxlength: 255 },
	dob: { type: Date },
	gender: { type: String, enum: ['Male', 'Female', 'Non-Binary'] },
	discord: { type: String },
	games: [{ type: ObjectId, ref: 'Game' }],
	roles: [{ type: String, enum: ['User', 'Control', 'Admin'] }],
	achievements: [{ type: ObjectId, ref: 'Achivement' }],
	community: {
		friends: [{ type: ObjectId, ref: 'User' }],
		encountered: [{ type: ObjectId, ref: 'User' }]
	},
	dateRegistered: { type: Date },
	lastLogin: { type: Date },
	lastGame: { type: Date },
	bio: { type: String },
	lastUpdated: { type: Date }
});

UserSchema.methods.generateAuthToken = function() {
	const user = this.toObject();
	delete user.password;
	const token = jwt.sign(
		user,
		config.get('jwtPrivateKey')
	);

	return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
