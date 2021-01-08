const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const GameStateSchema = new Schema({
	round: { type: Number, required: true },
	endTime: { type: Date, required: true },
	status: { type: String, enum: ['Active', 'Resolution', 'Down']	},
	tag: { type: String, unique: true }
});

const GameState = mongoose.model('GameState', GameStateSchema);

module.exports = { GameState };