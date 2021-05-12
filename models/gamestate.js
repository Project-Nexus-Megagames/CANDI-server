const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const GameStateSchema = new Schema({
	model:  { type: String, default: 'GameState' },
	round: { type: Number, required: true },
	endTime: { type: String, default: '2021-03-24T17:52:50.969Z' },
	status: { type: String, enum: ['Active', 'Resolution', 'Down']	},
	tag: { type: String, unique: true },
	hunger: { type: Number, default: 100 },
	happiness: { type: Number, default: 100 },
	discovered: { type: Boolean, default: false }
});

const GameState = mongoose.model('GameState', GameStateSchema);

module.exports = { GameState };