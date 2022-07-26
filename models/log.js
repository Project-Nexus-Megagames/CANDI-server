const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const LogSchema = new Schema({
	model:  { type: String, default: 'Log' },
	account: { type: String, required: true, default: 'No Account provided :/' },
	creator: { type: ObjectId, ref: 'Character' }
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
		submodel: { type: String, default: 'MissionLog' }
	})
);


const NextRoundLog = Log.discriminator(
	'NextRoundLog',
	new Schema({
		submodel: { type: String, default: 'GameState' },
		logMessages: [{ type: String }]
	})
);

module.exports = { Log, NextRoundLog, ControlLog };