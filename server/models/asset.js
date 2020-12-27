const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const AssetSchema = new Schema({
	model:  { type: String, default: 'Asset', enum: ['Asset', 'Trait'] },
	name: { type: String, required: true },
	description: { type: String, required: true },
	status: {
		lent: { type: Boolean, default: false },
		destroyed: { type: Boolean, default: false }
	},
	uses: { type: Number, default: 0 }
});

const Asset = mongoose.model('Asset', AssetSchema);

module.exports = { Asset };