const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const CharacterSchema = new Schema({
	model:  { type: String, default: 'Character' },
	playerName: { type: String, minlength: 2, maxlength: 50, required: true },
	email: { type: String, required: true },
	controlEmail: { type: String, default: ''},
	worldAnvil: { type: String, required: true },
	timeZone: { type: String, required: true },
	characterName: { type: String, minlength: 2, maxlength: 50, required: true },
	tag: { type: String, enum: ['Former Servants', 'Ferrymen', 'Furies', 'Angels', 'Demons', 'Cold Forges', 'Gehennatown', 'Misfits', 'Elysian Fields', 'NPC'], required: true },
	username: { type: String, minlength: 2, maxlength: 50, required: true },
	bio: { type: String },
	icon: { type: String },
	standingOrders: { type: String },
	traits: [{ type: ObjectId, ref: 'Asset' }], // change to trait ID
	assets: [{ type: ObjectId, ref: 'Asset' }], // change to asset ID
	lentAssets: [{ type: ObjectId, ref: 'Asset' }], // change to asset ID
	popSupport: { type: Number, default: 0 },
	wealth: { type: ObjectId, ref: 'Asset', required: true },
	memories: {
		first: {
			trigger: { type: String },
			recall: { type: String },
			revealed: { type: Boolean, default: false }
		},
		second: {
			trigger: { type: String },
			recall: { type: String },
			revealed: { type: Boolean, default: false }
		},
		third: {
			trigger: { type: String },
			recall: { type: String },
			revealed: { type: Boolean, default: false }
		}
	},
	status: {
		candidate: { type: Boolean, default: false }
	},
	supporters: [{ type: String }],
	effort: { type: Number, default: 3, min: 0, max: 3 }
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = { Character };