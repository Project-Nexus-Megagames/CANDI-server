const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const GameConfigSchema = new Schema({
	model: { type: String, default: 'Config' },
	name: { type: String, required: true },
	description: { type: String, required: false },
	// status: [{ type: String }],
	actionTypes: [{
		name: [{ type: String, default: 'Normal', enum: ['Normal', 'Feed', 'Agenda', 'Explore'], required: true }],
		minEffort: { type: Number, required: true },
		maxEffort: { type: Number, required: true },
		effortType: [{ type: String, default: 'Normal', enum: ['Normal', 'Feed', 'Agenda', 'Explore'], required: true }],
		traitTypes: [{ type: String }],
		maxTraits: { type: Number, required: true } }],
	gamestate: {
		effortTypes: [{
			name: [{ type: String, default: 'Normal', enum: ['Normal', 'Feed', 'Agenda', 'Explore'], required: true }],
			effortAmount: { type: Number, required: true, Default: 0 },
			effortRestored:  { type: Number, required: true, Default: 0 }
		}]
	}
});

const GameConfig = mongoose.model('GameConfig', GameConfigSchema);

module.exports = { GameConfig };