const mongoose = require('mongoose'); // Mongo DB object modeling module
// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const ActionTypeSchema = new Schema({
	model: { type: String, default: 'ActionType' },
	type: { type: String, default: 'Normal', required: true },
	minEffort: { type: Number, required: true, default: 0 },
	maxEffort: { type: Number, required: true, default: 0 },
	effortTypes: [{ type: String, default: 'Normal', required: true }],
	assetType: [{ type: String }], // type of assets that can be accepted by the actions
	maxAssets: { type: Number, required: true, default: 0 },
	status: [{ type: String }], // status array, e.g. for 'public' or 'campaign'
	icon: { type: String },
	public: { type: Boolean, default: false },
	subTypes: [{ type: String }]
});

const EffortTypeSchema = new Schema({
	model: { type: String, default: 'EffortType' },
	tag: { type: String, default: 'PC' },
	type: { type: String, default: 'Normal', required: true },
	effortAmount: { type: Number, required: true, Default: 0 }
});

const ResourceTypeSchema = new Schema({
	model: { type: String, default: 'ResourceType' },
	type: { type: String, default: 'Asset', required: true }
});

const StatSchema = new Schema({
	submodel: { type: String, default: 'Stat' },
	type: { type: String, default: 'Some Stat', required: true },
	statAmount: { type: Number, default: 0, required: true }
});

const GameConfigSchema = new Schema({
	model: { type: String, default: 'GameConfig' },
	name: { type: String, required: true, default: 'Quack' },
	description: { type: String, required: false },
	effortTypes: [EffortTypeSchema],
	resourceTypes: [ResourceTypeSchema],
	actionTypes: [ActionTypeSchema],
	globalStats: [StatSchema],
	characterStats: [StatSchema]
});

GameConfigSchema.methods.populateMe = function () {
	return this.populate(['actionTypes', 'effortTypes']);
};

const GameConfig = mongoose.model('GameConfig', GameConfigSchema);
const ActionType = mongoose.model('ActionType', ActionTypeSchema);
const EffortType = mongoose.model('EffortType', EffortTypeSchema);

module.exports = { GameConfig, ActionType, EffortType, StatSchema };
