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
	worldAnvil: { type: String, required: true },
	timeZone: { type: String, required: true },
	characterName: { type: String, minlength: 2, maxlength: 50, required: true },
	tag: { type: String, enum: ['Former Servants', 'Ferrymen', 'Furies', 'Angels', 'Demons', 'Cold Forges', 'Gehennatown', 'Misfits', 'NPC'], required: true },
	username: { type: String, minlength: 2, maxlength: 50, required: true },
	bio: { type: String },
	icon: { type: String },
	objectives: { type: String },
	standingOrders: { type: String },
	traits: [{ type: Schema.Types.Mixed }], // change to trait ID
	assets: [{ type: Schema.Types.Mixed }], // change to asset ID
	lentAssets: [{ type: Schema.Types.Mixed }], // change to asset ID
	popSupport: { type: Number, default: 0 },
	wealth: { type: String, enum: ['Poor', 'Laborer', 'Comfortable', 'Affluent', 'Luxury'], default: 'Comfortable' },
	status: {
		candidate: { type: Boolean, default: false }
	}
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = { Character };