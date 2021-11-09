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
	wiki: { type: String, default: '' },
	timeZone: { type: String, default: '???' },
	characterName: { type: String, minlength: 2, maxlength: 50, required: true },
	characterTitle: { type: String, maxlength: 50, default: 'None' },
	tags: [{ type: String }],
	username: { type: String, minlength: 2, maxlength: 50, required: true },
	pronouns: { type: String },
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
	Glory: { type: Number, default: 0 },
	supporters: [{ type: String }], // legacy
	effort: { type: Number, default: 2, min: 0, max: 6 },
	bitsyCount: { type: Number, default: 0 },
	bitsy: { type: String, default: '2021-03-24T17:52:50.969Z' }
	// color: { type: String, default: 'ffffff' }
});

CharacterSchema.methods.expendEffort = async function(amount) {
	try {
		// console.log(amount);
		this.effort = this.effort - amount;
		const character = await this.save();

		// nexusEvent.emit('updateCharacters'); // Needs proper update for CANDI
		return character;
	}
	catch (err) {
		console.log(err); // Add proper error handling for CANDI
	}
};

CharacterSchema.methods.restoreEffort = async function(amount) {
	try {
		this.effort = this.effort + amount;
		// console.log(amount);
		if (this.effort > 2) this.effort = 2;
		const character = await this.save();

		// nexusEvent.emit('updateCharacters'); // Needs proper update for CANDI
		return character;
	}
	catch (err) {
		console.log(err); // Add proper error handling for CANDI
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