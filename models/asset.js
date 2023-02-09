const mongoose = require('mongoose'); // Mongo DB object modeling module
const { clearArrayValue, addArrayValue } = require('../middleware/util/arrayCalls');
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const AssetSchema = new Schema({
	model: { type: String, default: 'Asset' },
	type: { type: String, default: 'Asset' },
	tags: [{ type: String }],
	name: { type: String, required: true },
	dice: { type: String, required: true, default: 'd6' },
	description: { type: String, required: true },
	status: [{ type: String }],
	// status: {
	// 	hidden: { type: Boolean, default: false },
	// 	lent: { type: Boolean, default: false },
	// 	lendable: { type: Boolean, default: false },
	// 	used: { type: Boolean, default: false }
	// },
	owner: { type: String, default: 'None' },
	ownerCharacter: { type: ObjectId, ref: 'Character' },
	currentHolder: { type: String },
	uses: { type: Number, default: 2 }
});

AssetSchema.methods.toggleStatus = async function(tag, remove) {
	if (remove) {
		await clearArrayValue(this.status, tag); //
	}
	else {await addArrayValue(this.status, tag);} //
	const asset = await this.save();
	return asset;
};


AssetSchema.methods.use = async function() {
	this.toggleStatus('used');
	return;
};

AssetSchema.methods.unuse = async function() {
	const asset = await this.toggleStatus('used', true);
	console.log(`${asset.name} owned by ${asset.owner} has been unused.`);
	return asset;
};

const Asset = mongoose.model('Asset', AssetSchema);

const Bond = Asset.discriminator(
	'Bond',
	new Schema({
		with: { type: ObjectId, ref: 'Character', required: true },
		level: { type: Number, default: 2 } // { type: String, enum: ['Condemned', 'Disfavoured', 'Preferred', 'Favoured', 'Blessed', 'Loathing', 'Unfriendly', 'Neutral', 'Warm', 'Friendly', 'Bonded' ] },
	})
);

module.exports = { Asset, Bond };