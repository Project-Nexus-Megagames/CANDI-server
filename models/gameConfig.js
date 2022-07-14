const mongoose = require('mongoose'); // Mongo DB object modeling module
// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

// TODO remove enum stuff
const ActionTypeSchema = new Schema({
	model: { type: String, default: 'ActionType' },
	type: { type: String, default: 'Normal', required: true },
	minEffort: { type: Number, required: true, default: 0 },
	maxEffort: { type: Number, required: true, default: 0 },
	effortTypes: [{ type: String, default: 'Normal', required: true }],
	assetType: [{ type: String }], // type of assets that can be accepted by the actions
	maxAssets: { type: Number, required: true, default: 0 },
	status: [ { type: String }], // status array, e.g. for 'public' or 'campaign'
	icon: { type: String }
});

const EffortTypeSchema = new Schema ({
	model: { type: String, default: 'EffortType' },
	type: { type: String, default: 'Normal', required: true },
	effortAmount: { type: Number, required: true, Default: 0 }
});

const GameConfigSchema = new Schema({
	model: { type: String, default: 'GameConfig' },
	name: { type: String, required: true, default: 'Quack' },
	description: { type: String, required: false },
	actionTypes: [ActionTypeSchema],
	effortTypes: [EffortTypeSchema]
});

GameConfigSchema.methods.populateMe = function() {
	return this
		.populate('actionTypes')
		.populate('effortTypes')
		.execPopulate();
};

const GameConfig = mongoose.model('GameConfig', GameConfigSchema);
const ActionType = mongoose.model('ActionType', ActionTypeSchema);
const EffortType = mongoose.model('EffortType', EffortTypeSchema);

// TODO write post-Schema validator method that is called pre.save
// https://mongoosejs.com/docs/4.x/docs/validation.html
// have defaults for every required value!
// first let them have populate the action types and effort types
// Then the rest....
// add name of action icon to schema

module.exports = { GameConfig, ActionType, EffortType };