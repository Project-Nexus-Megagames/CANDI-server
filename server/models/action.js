const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const ActionSchema = new Schema({
	model:  { type: String, default: 'Action' },
	players: [{ type: ObjectId, ref: 'Player' }],
	approach:  { type: String, default: 'Masks' }, // Update this when docs come
	traits: [{ type: Schema.Types.Mixed }], // change to trait ID
	assets: [{ type: Schema.Types.Mixed }], // change to asset ID
	description: { type: String },
	intent: { type: String },
	effort: { type: Number, required: true },
	status: {
		draft: { type: Boolean, default: false },
		complete: { type: Boolean, default: false },
		progress: { type: Number, default: 0 }
	},
	dieResult: { type: Number, required: true },
	resolution: { type: String }
});

const Action = mongoose.model('Action', ActionSchema);

module.exports = { Action };