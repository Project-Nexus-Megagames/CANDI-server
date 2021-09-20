const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const MortalRelationshipSchema = new Schema({
	with: { type: ObjectId, ref: 'Character' },
	level: { type: String, enum: ['Neutral', 'Warm', 'Friendly', 'Bonded' ] }
});

const GodRelationshipSchema = new Schema({
	with: { type: ObjectId, ref: 'Character' },
	level: { type: String, enum: ['Neutral', 'Preferred', 'Favoured', 'Blessed' ] }
});

const CharacterSchema = new Schema({
	model:  { type: String, default: 'Character' },
	playerName: { type: String, minlength: 1, maxlength: 50, required: true },
	email: { type: String, required: true },
	controlEmail: { type: String },
	worldAnvil: { type: String, required: true },
	timeZone: { type: String, default: '???' },
	characterName: { type: String, minlength: 2, maxlength: 50, required: true },
	characterActualName: { type: String, maxlength: 50, default: 'None' },
	tags: [{ type: String }],
	username: { type: String, minlength: 2, maxlength: 50, required: true },
	pronouns: { type: String },
	control: { type: String, default: 'None' },
	bio: { type: String },
	standingOrders: { type: String },
	lentAssets: [{ type: ObjectId, ref: 'Asset' }], // change to asset ID
	Justice: { type: Number, default: 0 },
	Trickery: { type: Number, default: 0 },
	Balance: { type: Number, default: 0 },
	Hedonism: { type: Number, default: 0 },
	Bonding: { type: Number, default: 0 },
	Arts: { type: Number, default: 0 },
	Sporting: { type: Number, default: 0 },
	Fabrication: { type: Number, default: 0 },
	Scholarship: { type: Number, default: 0 },
	Pugilism : { type: Number, default: 0 },
	supporters: [{ type: String }], // legacy
	effort: { type: Number, default: 2, min: 0, max: 6 }
	// color: { type: String, default: 'ffffff' }
});

CharacterSchema.methods.expendEffort = async function(amount) {
	try {
		this.effort = this.effort - amount;
		const character = await character.save();
		character.populate('assets').populate('lentAssets');

		// nexusEvent.emit('updateCharacters'); // Needs proper update for CANDI
		return character;
	}
	catch (err) {
		console.log(err) // Add proper error handling for CANDI
	}
};

CharacterSchema.methods.restoreEffort = async function(amount = 3) {
	try {
		this.effort = this.effort + amount;
		if (this.effort > 3) this.effort = 3;
		const character = await character.save();
		character.populate('assets').populate('lentAssets');

		// nexusEvent.emit('updateCharacters'); // Needs proper update for CANDI
		return character;
	}
	catch (err) {
		console.log(err) // Add proper error handling for CANDI
	}
};

const Character = mongoose.model('Character', CharacterSchema);

const Mortal = Character.discriminator(
	'Mortal',
	new Schema({
		type: { type: String, default: 'Mortal' },
		relationships: [ MortalRelationshipSchema ]
	})
);

const God = Character.discriminator(
	'God',
	new Schema({
		type: { type: String, default: 'God' },
		relationships: [ GodRelationshipSchema ]
	})
);


module.exports = { Character, Mortal, God };