const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const HistorySchema = new Schema({
	model: { type: String, default: 'History' },
	timestamp: { type: Date },
	docType: { type: String },
	action: { type: String },
	function: { type: String },
	document: { type: Schema.Types.Mixed },
	user: { type: String },
	character: { type: ObjectId, ref: 'Character' }
});

const History = mongoose.model('History', HistorySchema);

module.exports = { History };