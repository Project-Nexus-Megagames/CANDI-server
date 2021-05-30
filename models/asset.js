const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const AssetSchema = new Schema({
	model: { type: String, default: 'Asset' },
	type: { type: String, default: 'Asset', enum: ['Asset', 'Trait', 'Wealth', 'Bond', 'Power', 'Territory'] },
	name: { type: String, required: true },
	description: { type: String, required: true },
	level: { type: String, default: 'Neutral', enum: ['Loathing', 'Unfriendly', 'Neutral', 'Warm', 'Friendly', 'Bonded' ] },
	status: {
		hidden: { type: Boolean, default: false },
		lent: { type: Boolean, default: false },
		multiUse: { type: Boolean, default: false },
		lendable: { type: Boolean, default: false },
		used: { type: Boolean, default: false }
	},
	owner: { type: String, default: 'None' },
	ownerCharacter: { type: ObjectId, ref: 'Character' },
	currentHolder: { type: String },
	uses: { type: Number, default: 2 }
});

AssetSchema.methods.use = async function() {
	this.used = true;
	const asset = await this.save();
	console.log(`${asset.name} has been used.`);
	return asset;
};

AssetSchema.methods.unuse = async function() {
	this.used = false;
	const asset = await this.save();
	console.log(`${asset.name} has been unused.`);
	return asset;
};


const Asset = mongoose.model('Asset', AssetSchema);


module.exports = { Asset };