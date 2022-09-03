// const { logger } = require('../middleware/log/winston'); // Loging midddleware

const mongoose = require('mongoose'); // Mongo DB object modeling module
// const Joi = require('joi'); // Schema description & validation module
// const nexusError = require('../middleware/util/throwError'); // Costom error handler util

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID
const nexusEvent = require('../middleware/events/events'); // Local event triggers
// const { actionAndEffortTypes } = require('../config/enums');

// MODEL Imports
const { Asset } = require('./asset');
const { Comment } = require('./comment');
// const { History } = require('./history');


const ArticleSchema = new Schema({
	model:  { type: String, default: 'Article' }, // Model for the DOC
	type: { type: String, default: 'News', required: true }, //  enum: actionAndEffortTypes, <- Disabling this so Actions are more permissive
	round: { type: Number }, // Round Number for the ACTION
	title: { type: String, required: true, minLength: 1, maxLength: 100 },
	body: { type: String, minLength: 1, maxLength: 10000 },
	image: { type: String },
	creator: { type: ObjectId, ref: 'Character' }, // The character that initiates an ACTION
	tags: [{ type: String }], // Any tags added by control
	comments: [{ type: ObjectId, ref: 'Comment' }], // User comments and system generated info
	publishDate: { type: Date }
}, { timestamps: true });

/**
 * TODO: MAKE submitting an article work here...
 * This NETHOD
 */
ArticleSchema.methods.submit = async function(submission, submittedActionType, config) {
	console.log(submission);
	// Expects description, intent, effort, assets, collaborators
	if (!submission.description) throw Error('A submission must have a description...');
	if (!submission.intent) throw Error('You must have an intent for an action...');

	// this.markModified('status');

	const { description, intent, effort } = submission;
	this.submission = {
		description, intent, effort
	};

	const changed = [];

	const actionType = config.find(el => el.type.toLowerCase() === submittedActionType.toLowerCase());
	if (!actionType) throw Error(`Action for type ${submittedActionType} is undefined`);
	const allowedAssets = actionType.assetType;

	for (const id of submission.assets) {

		let asset = await Asset.findById(id);
		const allowed = allowedAssets.find(el => el === asset.type.toLowerCase());
		if (!allowed) throw Error (`Asset of type ${asset.type} not allowed for ${submittedActionType}!`);
		this.submission.assets.push(id);
		asset = await asset.use();
		changed.push(asset);
	}

	this.markModified('submission.assets');

	const action = await this.save();

	nexusEvent.emit('respondClient', 'update', [ action, ...changed ]);
	return ({ message : `${action.type} Submission Success`, type: 'success' });
};

/**
 * This METHOD adds a comment to the article
 */
ArticleSchema.methods.comment = async function(comment) {
	// Expects body, author, type
	if (!comment.body) throw Error('A comment must have a body...');
	if (!comment.commentor) throw Error('A comment must have an commentor...');
	let post = new Comment(comment);
	post = await post.save();
	this.comments.push(post._id);
	this.markModified('comments');
	const article = await this.save();
	await article.populateMe();
	nexusEvent.emit('respondClient', 'update', [ article ]);
	return ({ message : `${article.type} Comment Success`, type: 'success' });
};

ArticleSchema.methods.deleteComment = async function(commentId) {
	if (!commentId) throw Error ('No comment to delete');
	const comment = this.comments.findIndex(el => el._id.toHexString() === commentId);
	this.comments.splice(comment, 1);
	const article = await this.save();
	await article.populateMe();
	nexusEvent.emit('respondClient', 'update', [article]);
	return {
		message: `Comment with the id ${commentId} was deleted via Socket!`,
		type: 'success'
	};

};

/**
 * This is the PUBLISH method
 */
ArticleSchema.methods.publish = async function() {
	if (!this.tags.some(el => el === 'Published')) this.tags.push('Published');
	if (this.tags.some(el => el === 'Draft')) {
		const i = this.tags.findIndex(el => el === 'Draft');
		if (i > -1) this.tags.splice(i, 1);
	}
	this.markModified('tags');

	await this.save();
};

ArticleSchema.methods.setToDraft = async function() {
	if (!this.tags.some(el => el === 'Draft')) this.tags.push('Draft');
	if (this.tags.some(el => el === 'Published')) {
		const i = this.tags.findIndex(el => el === 'Published');
		if (i > -1) this.tags.splice(i, 1);
	}
	this.markModified('tags');

	await this.save();
};


ArticleSchema.methods.edit = async function() {
	return;
};

ArticleSchema.methods.populateMe = async function() {
	// TODO: THIS IS A CORRECT POPULATE!!!!
	await this.populate([{
		path: 'comments',
		populate: { path: 'commentor', select: 'characterName profilePicture' }
	}, { path: 'creator', select: 'characterName username playerName profilePicture' }]);
};

const Article = mongoose.model('article', ArticleSchema);

module.exports = { Article };
