const mongoose = require("mongoose"); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
// const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const LocationSchema = new Schema({
  model: { type: String, default: "Location" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  borough: { type: String, required: true },
  currentOwner: { type: String, default: "None" },
  influence: { type: Number, default: 0, min: 0, max: 15 },
  unlockedBy: [{ type: String }],
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = { Location };
