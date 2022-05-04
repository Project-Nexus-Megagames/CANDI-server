const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const CharacterSchema = new Schema({
	model:  { type: String, default: 'Character' },
	playerName: { type: String, minlength: 1, maxlength: 50, required: true },
	email: { type: String, required: true },
	wiki: { type: String, default: '' },
	timeZone: { type: String, default: '???' },
	characterName: { type: String, minlength: 2, maxlength: 50, required: true },
	characterTitle: { type: String, maxlength: 50, default: 'None' },
	tags: [{ type: String }],
	control: [{ type: String }],
	username: { type: String, minlength: 2, maxlength: 50, required: true },
	pronouns: { type: String },
	bio: { type: String },
	standingOrders: { type: String },
	lentAssets: [{ type: ObjectId, ref: 'Asset' }],
	effort: { type: Number, default: 2, min: 0, max: 6 },
	bitsyCount: { type: Number, default: 0 },
	bitsy: { type: String, default: '2021-03-24T17:52:50.969Z' },
	color: { type: String, default: 'ffffff' }
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


module.exports = { Character };