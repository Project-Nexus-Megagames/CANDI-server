const mongoose = require('mongoose'); // Mongo DB object modeling module
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const CommentSchema = new Schema({
	model: { type: String, default: 'Comment' },
	type: { type: String, default: 'Comment', enum: ['Comment', 'Info'] },
	status: { type: String, default: 'Temp-Hidden', enum: ['Public', 'Private', 'Temp-Hidden'] },
	body: { type: String, required: true },
	commentor: { type: ObjectId, ref: 'Character' }
}, { timestamps: true });


CommentSchema.methods.populateMe = async function() {
	// TODO: THIS IS A CORRECT POPULATE!!!!
	await this.populate('commentor', ['characterName', 'profilePicture']);
};


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment };