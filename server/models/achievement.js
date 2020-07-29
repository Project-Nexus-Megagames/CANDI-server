const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AchievementSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  achievements: [{ type: Schema.Types.ObjectId, ref: "Achievement" }],
  age: { type: Number },
});

let Achievement = mongoose.model("Achievement", AchievementSchema);

module.exports = { Achievement };
