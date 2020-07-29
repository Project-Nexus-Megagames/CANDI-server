const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  model: { type: String, default: "User" },
  name: {
    prefix: { type: String },
    first: { type: String },
    middle: { type: String },
    last: { type: String },
    suffix: { type: String },
  },
  email: { type: String },
  username: { type: String },
  address: {
    street1: { type: String },
    street2: { type: String },
    city: { type: String },
    state: { type: String, minlength: 2, maxlength: 3 },
    zipcode: { type: String, minlength: 5, maxlength: 10 },
  },
  discord: { type: String },
  phone: { type: String, minlength: 10, maxlength: 14 },
  password: { type: String, required: true },
  achievements: [{ type: Schema.Types.ObjectId, ref: "Achievement" }],
  roles: [{ type: String, enum: ["Player", "Control", "Admin"] }],
  birthday: { type: Date },
  serviceRecord: [{ type: Schema.Types.ObjectId, ref: "Log" }],
  gameState: [],
});

let User = mongoose.model("User", UserSchema);

module.exports = { User };
