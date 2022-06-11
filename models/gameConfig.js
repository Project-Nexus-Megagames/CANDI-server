const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const ActionTypeSchema = new Schema({
	model: { type: String, default: 'ActionType' },
	name: { type: String, default: 'Normal', enum: ['Normal', 'Feed', 'Agenda', 'Explore'], required: true },
	minEffort: { type: Number, required: true },
	maxEffort: { type: Number, required: true },
	effortType: { type: String, default: 'Normal', enum: ['Normal', 'Feed', 'Agenda', 'Explore'], required: true },
	traitTypes: [{ type: String }],
	maxTraits: { type: Number, required: true } });

const EffortTypeSchema = new Schema ({
	model: { type: String, default: 'EffortType' },
	name: { type: String, default: 'Normal', enum: ['Normal', 'Feed', 'Agenda', 'Explore'], required: true },
	effortAmount: { type: Number, required: true, Default: 0 },
	effortRestored:  { type: Number, required: true, Default: 0 }
});

const GameConfigSchema = new Schema({
	model: { type: String, default: 'GameConfig' },
	name: { type: String, required: true },
	description: { type: String, required: false },
	actionTypes: [ActionTypeSchema],
	gamestate: {
		effortTypes: [EffortTypeSchema]
	}
});

const GameConfig = mongoose.model('GameConfig', GameConfigSchema);
const ActionType = mongoose.model('ActionType', ActionTypeSchema);
const EffortType = mongoose.model('EffortType', EffortTypeSchema);

module.exports = { GameConfig, ActionType, EffortType };