const mongoose = require('mongoose'); // Mongo DB object modeling module
const { actionAndEffortTypes } = require('../config/enums');
// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

// TODO remove enum stuff
const ActionTypeSchema = new Schema({
	model: { type: String, default: 'ActionType' },
	type: { type: String, default: 'Normal', enum: actionAndEffortTypes, required: true, unique: true },
	minEffort: { type: Number, required: true, default: 0 },
	maxEffort: { type: Number, required: true, default: 0 },
	effortTypes: [{ type: String, default: 'Normal', enum: actionAndEffortTypes, required: true, unique: true }],
	assetType: [{ type: String }], // type of assets that can be accepted by the actions
	maxAssets: { type: Number, required: true, default: 0 },
	status: [ { type: String }], // status array, e.g. for 'public' or 'campaign'
	icon: { type: String }
});

const EffortTypeSchema = new Schema ({
	model: { type: String, default: 'EffortType' },
	type: { type: String, default: 'Normal', enum: actionAndEffortTypes, required: true, unique: true },
	effortAmount: { type: Number, required: true, Default: 0 },
	effortRestored:  { type: Number, required: true, Default: 0 } // TODO scrap that for now; just restore it to 'EffortAmount'
});

const GameConfigSchema = new Schema({
	model: { type: String, default: 'GameConfig' },
	name: { type: String, required: true, default: 'Quack' },
	description: { type: String, required: false },
	actionTypes: [ActionTypeSchema],
	effortTypes: [EffortTypeSchema],
	actionAndEffortTypes: [{ type: String }] // TODO: maybe remove that and change the workflow, so that we configure effort types first and then actions and pull types from efforts
});

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