const mongoose = require('mongoose'); // Mongo DB object modeling module
const { actionAndEffortTypes } = require('../config/enums');
// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema


const ActionTypeSchema = new Schema({
	model: { type: String, default: 'ActionType' },
	type: { type: String, default: 'Normal', enum: actionAndEffortTypes, required: true, unique: true },
	minEffort: { type: Number, required: true, default: 0 },
	maxEffort: { type: Number, required: true, default: 0 },
	effortTypes: [{ type: String, default: 'Normal', enum: actionAndEffortTypes, required: true, unique: true }],
	traitTypes: [{ type: String }],
	maxTraits: { type: Number, required: true, default: 0 },
	public: { type: Boolean, default: false, required: true }
});

const EffortTypeSchema = new Schema ({
	model: { type: String, default: 'EffortType' },
	type: { type: String, default: 'Normal', enum: actionAndEffortTypes, required: true, unique: true },
	effortAmount: { type: Number, required: true, Default: 0 },
	effortRestored:  { type: Number, required: true, Default: 0 }
});

const GameConfigSchema = new Schema({
	model: { type: String, default: 'GameConfig' },
	name: { type: String, required: true, default: 'Quack' },
	description: { type: String, required: false },
	actionTypes: [ActionTypeSchema],
	effortTypes: [EffortTypeSchema],
	actionAndEffortTypes: [{ type: String }]
});

const GameConfig = mongoose.model('GameConfig', GameConfigSchema);
const ActionType = mongoose.model('ActionType', ActionTypeSchema);
const EffortType = mongoose.model('EffortType', EffortTypeSchema);

// TODO write post-Schema validator method that is called pre.save
// https://mongoosejs.com/docs/4.x/docs/validation.html
// have defaults for every required value!
// first let them have populate the action types and effort types
// Then the rest....

module.exports = { GameConfig, ActionType, EffortType };