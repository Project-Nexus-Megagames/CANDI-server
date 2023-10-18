const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util
const nexusEvent = require('../middleware/events/events'); // Local event triggers

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const StatSchema = new Schema({
	submodel: { type: String, default: 'Stat' },
	type: { type: String, default: 'Some Stat', required: true },
	statAmount: { type: Number, default: 0, required: true }
});

const LootItemSchema = new Schema({
	submodel: { type: String, default: 'LootItem' },
	name: { type: String, default: 'A rock', required: true },
	assetType: { type: String, default: 'Asset' },
	weight: { type: Number, default: 0, required: true },
	uses: { type: Number, default: 1 }
});

const SubLocationSchema = new Schema({
	name: { type: String },
	permissions: [{ type: String }]
});

const LocationSchema = new Schema({
	model: { type: String, default: 'Location' },
	name: { type: String, required: true },
	description: { type: String, required: true },
  subLocations: [ SubLocationSchema ],
  lootTable: [ LootItemSchema ],
	locationStats: [StatSchema],
	coords: {
		x: { type: Number, required: true }, //
		y: { type: Number, required: true }, //
		z: { type: Number, required: true } //

	},
	unlockedBy: [{ type: ObjectId, ref: 'Character' }]
});

LocationSchema.methods.populateMe = function() {
	return this
		.populate(['unlockedBy']);
};

LocationSchema.methods.restoreStat = async function (amount, type) {
	try {
		const locationStats = this.locationStats.find(
			(ef) => ef.type.toLowerCase() === type.toLowerCase()
		);
		if (!locationStats) throw Error(`Stat for type ${type} is undefined`);
		locationStats.statAmount = locationStats.statAmount + amount;
		let loaction = await this.save();
		loaction = await loaction.populateMe();

		nexusEvent.emit('request', 'update', [loaction]);
		return locationStats.statAmount;
	}
	catch (err) {
		console.log(err); // Add proper error handling for CANDI
	}
};


const Location = mongoose.model('Location', LocationSchema);

module.exports = { Location };
