const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const CommentSchema = new Schema({
	model: { type: String, default: 'Comment' },
	type: { type: String, default: 'Comment', enum: ['Comment', 'Info'] },
	body: { type: String, required: true },
	author: { type: String, required: true }
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment };