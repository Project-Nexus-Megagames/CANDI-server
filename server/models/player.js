const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const PlayerSchema = new Schema({
	model:  { type: String, default: 'Player' },
	playerName: { type: String, minlength: 2, maxlength: 50, required: true },
	email: { type: String },
	timeZone: { type: String },
	characterName: { type: String, minlength: 2, maxlength: 50, required: true },
	bio: { type: String },
	icon: { type: String },
	objectives:  { type: String },
	gameRecord: [{ type: ObjectId, ref: 'Log' }],
	traits: [{ type: Schema.Types.Mixed }], // change to trait ID
	assets: [{ type: Schema.Types.Mixed }], // change to asset ID
	lentAssets: [{ type: Schema.Types.Mixed }], // change to asset ID
	popSupport: { type: Number, default: 0 },
	wealth: { type: String, enum: ['None', 'Poor', 'Moderate', 'Well-Off', 'Wealth', 'Opulant'] },
	status: {
		candidate: { type: Boolean, default: false }
	}
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = { Player };