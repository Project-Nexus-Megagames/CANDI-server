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
	controlEmail: { type: String, default: '' },
	worldAnvil: { type: String, required: true },
	timeZone: { type: String, required: true },
	characterName: { type: String, minlength: 2, maxlength: 50, required: true },
	characterActualName: { type: String, minlength: 2, maxlength: 50, default: 'None' },
	tag: { type: String, enum: ['PC', 'NPC', 'Brother\'s Wrath', 'Unifiers', 'Sister\'s Wisdom', 'Factionless'], required: true },
	username: { type: String, minlength: 2, maxlength: 50, required: true },
	pronouns: { type: String },
	control: { type: String, default: 'None' },
	bio: { type: String },
	standingOrders: { type: String },
	assets: [{ type: ObjectId, ref: 'Asset' }], // change to asset ID
	lentAssets: [{ type: ObjectId, ref: 'Asset' }], // change to asset ID
	popSupport: { type: Number, default: 0 },
	supporters: [{ type: String }],
	effort: { type: Number, default: 3, min: 0, max: 6 },
	feed: { type: Boolean, default: false },
	color: { type: String, default: 'ffffff' }
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = { Character };