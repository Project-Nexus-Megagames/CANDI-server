const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ErrorSchema = new Schema({
  timestamp: { type: Date},
  level: {type: String},
  message: {type: String},
  meta: {
    message: {type: String},
    name: {type: String},
    stack: {type: String}
  }
  });

let Error = mongoose.model('Error', ErrorSchema);

module.exports = { LogError, validateLogError };