const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
  timestamp: { type: Date},
  level: {type: String},
  message: {type: String},
  meta: {
    message: {type: String},
    name: {type: String},
    stack: {type: String}
  }
  });

let Info = mongoose.model('Info', InfoSchema);

module.exports = { Info };