const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const LogSchema = new Schema({
	model:  { type: String, default: 'Log' }
}, { timestamps: true });

LogSchema.methods.populateMe = function() {
	return this
		.populate('creator', 'characterName')
		.execPopulate();
};

const Log = mongoose.model('Log', LogSchema);

const ControlLog = Log.discriminator(
	'ControlLog',
	new Schema({
		submodel: { type: String, default: 'ControlLog' }
	})
);

const NextRoundLog = Log.discriminator(
	'NextRoundLog',
	new Schema({
		submodel: { type: String, default: 'GameState' },
		logMessages: [{ type: String }],
		round: { type: Number },
		control: { type: String }
	})
);

module.exports = { Log, NextRoundLog, ControlLog };