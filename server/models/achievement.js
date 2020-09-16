const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AchievementSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	desc: { type: String },
	data: { type: Object }
});

const Achievement = mongoose.model('Achievement', AchievementSchema);

module.exports = { Achievement };
