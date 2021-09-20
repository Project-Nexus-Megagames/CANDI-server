const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID
const nexusEvent = require('../middleware/events/events'); // Local event triggers

// MODEL Imports
const { Character } = require('./character');
const { Asset } = require('./asset');
const { History } = require('./history');

const submissionSchema = new Schema({
	description: { type: String, required: true }, // Description of the ACTION
	intent: { type: String, required: true }, // Intended result of the ACTION
	effort: { type: Number, required: true, default: 0 }, // Initial effort allocated
	assets: { type: ObjectId, ref: 'Asset' }, // ASSETS used to facilitate this ACTION
	collaborators: [{ type: ObjectId, ref: 'Character' }] // Characters involved in the ACTION
}, { timestamps: true });

const resultSchema = new Schema({
	description: { type: String, default: 'None yet...', required: true }, // Description of the result
	dice: {
		amount: { type: Number, default: 1 }, // Amount of dice rolled
		type: { type: String, enum: ['d6', 'd8', 'd10', 'd12', 'd20', 'd100'] }, // Type of dice rolled
		roll: { type: String, default: 'None yet...', required: true } // Result of roll
	}
}, { timestamps: true });

const effectSchema = new Schema({
	description: { type: String, default: 'It did a thing...', required: true }, // Description of the result
	type: { type: String, enum: ['Asset', 'Action', 'Other'] }, // Type of effect
	action: { type: ObjectId, ref: 'Action' }, // Ref to any ACTION created by this ACTION
	asset: { type: ObjectId, ref: 'Asset' }, // Ref to any ASSET created by this ACTION
	other: { type: String } // Discription of the effect....
}, { timestamps: true });

const ActionSchema = new Schema({
	model:  { type: String, default: 'Action' }, // Model for the DOC
	type: { type: String, default: 'Action', enum: ['Action', 'Project', 'Feed' ] }, // Likely depreciated by the TAGS Array
	round: { type: Number }, // Round Number for the ACTION
	creator: { type: ObjectId, ref: 'Character' }, // The character that initiates an ACTION
	collaborators: [{ type: ObjectId, ref: 'Character' }], // Characters involved in the ACTION
	controllers: [{ type: String }], // Controllers assigned to handle this ACTION
	assets: { type: ObjectId, ref: 'Asset' }, // ASSETS used to facilitate this ACTION
	progress: { type: Number, default: 0, min: 0, max: 100 }, // % of compleation | Goes to 100% automatically when control posts a RESULT
	effort: { type: Number, required: true, default: 0 }, // Current effort assigned to the ACTION
	status: [{ type: String, enum: ['Draft', 'Awaiting', 'Ready', 'Published' ] }], // Any current STATUS of this ACTION
	tags: [{ Type: String }], // Any tags added by control
	image: { type: String }, // URL for an image associated with this ACTION
	submission: submissionSchema, // Player submission that created the ACTION
	result: resultSchema, // Controller generated result of the ACTION
	effects: [effectSchema] // Mechanical effects of the ACTION
}, { timestamps: true });

const Action = mongoose.model('Action', ActionSchema);

module.exports = { Action };