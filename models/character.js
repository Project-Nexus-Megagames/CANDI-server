const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const injurySchema = new Schema({
	model: { type: String, default: 'Injury' },
	label: { type: String },
	received: { type: Number },
	expires: { type: Number },
	duration: { type: Number },
	actionTitle: { type: String, default: 'no action description was to be found' }
});

const CharacterSchema = new Schema({
	model:  { type: String, default: 'Character' },
	playerName: { type: String, minlength: 1, maxlength: 50, required: true },
	characterName: { type: String, minlength: 2, maxlength: 50, required: true },
	username: { type: String, minlength: 2, maxlength: 50, required: true },
	characterTitle: { type: String, maxlength: 50, default: 'None' },
	pronouns: { type: String },
	bio: { type: String },
	email: { type: String, required: true },
	wiki: { type: String, default: '' },
	timeZone: { type: String, default: '???' },
	tags: [{ type: String }],
	control: [{ type: String }],
	standingOrders: { type: String },
	lentAssets: [{ type: ObjectId, ref: 'Asset' }],
	effort: { type: Number, default: 2, min: 0, max: 6 },
	bitsyCount: { type: Number, default: 0 },
	bitsy: { type: String, default: '2021-03-24T17:52:50.969Z' },
	color: { type: String, default: 'ffffff' },
	unlockedBy: [{ type: ObjectId, ref: 'Character' }],
	injuries: [injurySchema]
});


CharacterSchema.methods.expendEffort = async function(amount) {
	try {
		// console.log(amount);
		this.effort = this.effort - amount;
		let character = await this.save();
		character = await character.populateMe();

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
		let character = await this.save();
		character = await character.populateMe();

		// nexusEvent.emit('updateCharacters'); // Needs proper update for CANDI
		return character;
	}
	catch (err) {
		console.log(err); // Add proper error handling for CANDI
	}
};

CharacterSchema.methods.populateMe = async function() {
	return this
		.populate('unlockedBy', 'characterName playerName')
		.execPopulate();
};

const Character = mongoose.model('Character', CharacterSchema);

module.exports = { Character };