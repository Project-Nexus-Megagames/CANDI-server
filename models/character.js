const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID
const nexusEvent = require('../middleware/events/events'); // Local event triggers

const injurySchema = new Schema({
	submodel: { type: String, default: 'Injury' },
	name: { type: String, default: 'Scurvey' },
	received: { type: Number },
	duration: { type: Number },
	permanent: { type: Boolean, default: false },
	actionTitle: { type: String, default: 'no action title was to be found' }
});

const effortSchema = new Schema({
	submodel: { type: String, default: 'Effort' },
	type: { type: String, default: 'Normal' },
	amount: { type: Number, default: 0, required: true }
});

const StatSchema = new Schema({
	submodel: { type: String, default: 'Stat' },
	type: { type: String, default: 'Some Stat', required: true },
	statAmount: { type: Number, default: 0, required: true }
});

const CharacterSchema = new Schema({
	model: { type: String, default: 'Character' },
	playerName: { type: String, minlength: 1, maxlength: 100, required: true },
	characterName: { type: String, minlength: 2, maxlength: 100, required: true },
	username: { type: String, minlength: 2, maxlength: 100, default: 'temp' },
	characterTitle: { type: String, maxlength: 100, default: 'None' },
	pronouns: { type: String },
	bio: { type: String },
	email: { type: String, required: true },
	wiki: { type: String, default: '' },
	timeZone: { type: String, default: '???' },
	tags: [{ type: String }],
	control: [{ type: String }],
	standingOrders: { type: String },
	effort: [effortSchema],
	characterStats: [StatSchema],
	knownContacts: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
	injuries: [injurySchema],
	profilePicture: { type: String }
});

CharacterSchema.methods.expendEffort = async function (amount, type) {
	try {
		if (!amount || !type) {
			throw Error(
				`expendEffort() must have type and amount. amount: '${amount}' - type: '${type}'`
			);
		}
		const effort = this.effort.find(
			(ef) => ef.type.toLowerCase() === type.toLowerCase()
		);
		if (!effort) throw Error(`Effort for type ${type} is undefined`);
		if (effort.amount < amount) {
			throw Error(
				`Not enough Effort for type ${type}: ${effort.amount} < ${amount}`
			);
		}
		effort.amount = effort.amount - amount;

		let character = await this.save();
		character = await character.populateMe();

		nexusEvent.emit('respondClient', 'update', [character]);
		// nexusEvent.emit('updateCharacters'); // Needs proper update for CANDI
		return character;
	}
	catch (err) {
		console.log(err); // Add proper error handling for CANDI
		throw Error(err);
	}
};

CharacterSchema.methods.restoreEffort = async function (amount, type, config) {
	try {
		let effort = this.effort.find(
			(ef) => ef.type.toLowerCase() === type.toLowerCase()
		);
		if (!effort) {
			this.effort.push({ amount: 0, type });
			effort = this.effort.find(
				(ef) => ef.type.toLowerCase() === type.toLowerCase()
			);
		}

		if (!effort) throw Error(`This effort is bad ${type}`);

		const configEffort = config.find(
			(ef) => ef.type.toLowerCase() === type.toLowerCase()
		);
		effort.amount = effort.amount + amount;
		if (effort.amount > configEffort.effortAmount) effort.amount = configEffort.effortAmount;
		let character = await this.save();
		character = await character.populateMe();

		nexusEvent.emit('respondClient', 'update', [character]);
		return character;
	}
	catch (err) {
		console.log(err); // Add proper error handling for CANDI
	}
};

CharacterSchema.methods.restoreStat = async function (amount, type) {
	try {
		const characterStats = this.characterStats.find(
			(ef) => ef.type.toLowerCase() === type.toLowerCase()
		);
		if (!characterStats) throw Error(`Stat for type ${type} is undefined`);
		characterStats.statAmount = characterStats.statAmount + amount;
		let character = await this.save();
		character = await character.populateMe();

		nexusEvent.emit('respondClient', 'update', [character]);
		return characterStats.statAmount;
	}
	catch (err) {
		console.log(err); // Add proper error handling for CANDI
	}
};

CharacterSchema.methods.populateMe = async function () {
	return this.populate(['knownContacts', 'effort']);
};

const Character = mongoose.model('Character', CharacterSchema);

module.exports = { Character };
