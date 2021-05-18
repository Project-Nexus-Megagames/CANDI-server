const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
// const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const HistorySchema = new Schema({
	model: { type: String, default: 'History' },
	timeStamp: { type: Date },
	action: { type: String },
	document: { type: Schema.Types.Mixed },
	user: { type: String },
	character: { type: String }
});

const History = mongoose.model('History', HistorySchema);

module.exports = { History };