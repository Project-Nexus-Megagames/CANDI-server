const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const GameStateSchema = new Schema({
	model:  { type: String, default: 'GameState' },
	round: { type: Number, required: true, default: 0 },
	endTime: { type: String, default: '2021-03-24T17:52:50.969Z' },
	status: { type: String, enum: ['Active', 'Resolution', 'Down'], default: 'Resolution'	},
	tag: { type: String, unique: true },
	hunger: { type: Number, default: 100 },
	happiness: { type: Number, default: 100 },
	gcHappiness: { type: Number, default: 0 },
	gcHealth: { type: Number, default: 0 },
	gcSecurity: { type: Number, default: 0 },
	gcDiplomacy: { type: Number, default: 0 },
	gcPolitics: { type: Number, default: 0 }
});

const GameState = mongoose.model('GameState', GameStateSchema);

module.exports = { GameState };