const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const LogSchema = new Schema({
	model:  { type: String, default: 'Log' }
}, { timestamps: true });

LogSchema.methods.populateMe = function() {
	return this
		.execPopulate();
};

const Log = mongoose.model('Log', LogSchema);

const ControlLog = Log.discriminator(
	'ControlLog',
	new Schema({
		submodel: { type: String, default: 'ControlLog' },
		control: { type: String },
		round: { type: Number },
		message: { type: String },
		character: { type: String, default: 'No character associated with this control voodoo' },
		action: { type: String, default: 'No action associated with this control voodoo' },
		controlAction: { type: String, default: 'This should not be possible.' }
	})
);

const NextRoundLog = Log.discriminator(
	'NextRoundLog',
	new Schema({
		submodel: { type: String, default: 'NextRoundLog' },
		logMessages: [{ type: String }],
		round: { type: Number },
		control: { type: String }
	})
);

module.exports = { Log, NextRoundLog, ControlLog };