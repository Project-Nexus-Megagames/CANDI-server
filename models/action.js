const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
// const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const ActionSchema = new Schema({
	model:  { type: String, default: 'Action' },
	type: { type: String, default: 'Action', enum: ['Action', 'Project', 'Feed' ] },
	creator: { type: String },
	players: [{ type: String }],
	asset1: { type: String },
	asset2: { type: String },
	asset3: { type: String },
	round: { type: Number },
	description: { type: String, required: true },
	intent: { type: String, required: true },
	effort: { type: Number, required: true, default: 0 },
	status: { type: String, default: 'Draft', enum: ['Draft', 'Awaiting', 'Ready', 'Published' ] },
	newsworthy: { type: Boolean, default: false },
	progress: { type: Number, default: 0 },
	dieResult: { type: String, default: 'None Yet...' },
	controlAssigned: { type: String, default: 'None Yet...' },
	image: { type: String },
	result: { type: String, default: 'No Result Recorded Yet...' },
	mechanicalEffect: { type: String, default: 'No Mechanical Effect Recorded Yet...' }
});

const Action = mongoose.model('Action', ActionSchema);

const FeedAction = Action.discriminator(
	'FeedAction',
	new Schema({
		type: { type: String, default: 'FeedAction' },
		overfeeding: { type: Number, default: 0 },
		description: { type: String, default: 'FeedAction' }
	})
);

module.exports = { Action, FeedAction };