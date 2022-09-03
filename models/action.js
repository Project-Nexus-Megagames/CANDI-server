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

const effortSchema = new Schema({
	model: { type: String, default: 'Effort' },
	effortType: { type: String, default: 'Normal', required: true },
	amount: { type: Number, required: true, default: 0 }
});

const submissionSchema = new Schema({
	model: { type: String, default: 'Submission' },
	description: { type: String, required: true }, // Description of the ACTION
	intent: { type: String, required: true }, // Intended result of the ACTION
	effort: effortSchema, // Initial effort allocated
	assets: [{ type: ObjectId, ref: 'Asset' }], // ASSETS used to facilitate this ACTION
	collaborators: [{ type: ObjectId, ref: 'Character' }] // Characters involved in the ACTION
}, { timestamps: true });

const resultSchema = new Schema({
	model: { type: String, default: 'Result' },
	status: { type: String, default: 'Temp-Hidden', enum: ['Public', 'Private', 'Temp-Hidden'] },
	resolver: { type: ObjectId, ref: 'Character' },
	ready: { type: Boolean, default: true },
	description: { type: String, default: 'None yet...', required: true }, // Description of the result
	dice: { type: String, default: 'None' }
}, { timestamps: true });

const effectSchema = new Schema({
	model: { type: String, default: 'Effect' },
	status: { type: String, default: 'Temp-Hidden', enum: ['Public', 'Private', 'Temp-Hidden'] },
	effector: { type: ObjectId, ref: 'Character' },
	description: { type: String, default: 'It did a thing...', required: true }, // Description of the result
	type: { type: String }, // Type of effect
	action: { type: ObjectId, ref: 'Action' }, // Ref to any ACTION created by this ACTION
	asset: { type: ObjectId, ref: 'Asset' }, // Ref to any ASSET created by this ACTION
	other: { type: String } // Discription of the effect....
}, { timestamps: true });

const ActionSchema = new Schema({
	model:  { type: String, default: 'Action' }, // Model for the DOC
	name: { type: String },
	type: { type: String, default: 'Normal', required: true }, //  enum: actionAndEffortTypes, <- Disabling this so Actions are more permissive
	round: { type: Number }, // Round Number for the ACTION
	creator: { type: ObjectId, ref: 'Character' }, // The character that initiates an ACTION
	collaborators: [{ type: ObjectId, ref: 'Character' }], // Characters involved in the ACTION
	controllers: [{ type: String }], // Controllers assigned to handle this ACTION
	tags: [{ type: String }], // Any tags added by control
	submission: submissionSchema, // Player submission that created the ACTION
	comments: [{ type: ObjectId, ref: 'Comment' }], // User comments and system generated info
	results: [resultSchema], // Controller generated result of the ACTION
	effects: [effectSchema], // Mechanical effects of the ACTION,
	publishDate: { type: Date } // published Date for the Agenda
}, { timestamps: true });

const Effect = mongoose.model('Effect', effectSchema);
const Result = mongoose.model('Result', resultSchema);

ActionSchema.methods.submit = async function(submission, submittedActionType, config) {
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

ActionSchema.methods.comment = async function(comment) {
	console.log('NEW COMMENT', comment);
	// Expects body, author, type
	if (!comment.body) throw Error('A comment must have a body...');
	if (!comment.commentor) throw Error('A comment must have an commentor...');

	let post = new Comment(comment);

	post = await post.save();

	await post.populateMe();

	this.comments.push(post._id);
	this.markModified('comments');

	const action = await this.save();

	await action.populateMe();

	nexusEvent.emit('respondClient', 'update', [ action ]);
	return ({ message : `${action.type} Comment Success`, type: 'success' });
};


/**
 * This is the PUBLISH method
 */
ActionSchema.methods.publish = async function() {
	if (!this.tags.some(el => el === 'Published')) this.tags.push('Published');
	if (this.tags.some(el => el === 'Draft')) {
		const i = this.tags.findIndex(el => el === 'Draft');
		if (i > -1) this.tags.splice(i, 1);
	}
	this.markModified('tags');

	return await this.save();
};

ActionSchema.methods.setToDraft = async function() {
	if (!this.tags.some(el => el === 'Draft')) this.tags.push('Draft');
	if (this.tags.some(el => el === 'Published')) {
		const i = this.tags.findIndex(el => el === 'Published');
		if (i > -1) this.tags.splice(i, 1);
	}
	this.markModified('tags');

	await this.save();
};


ActionSchema.methods.edit = async function() {
	return;
};

ActionSchema.methods.postResult = async function(result) {
	// Expects { result, dice: { type, amount, roll } }
	try {
		if (!result.description) throw Error('Results must have a description..');
		if (!result.dice) throw Error('Results must have dice information attched..');
		// else if (!result.dice.roll) throw Error('Result must have final dice roll...');
		let post = new Result(result);

		post = await post.save();

		await post.populate('resolver', 'characterName profilePicture');

		this.results.push(post);
		this.markModified('results');

		const action = await this.save();
		await action.populateMe();

		nexusEvent.emit('respondClient', 'update', [ action ]);
		return ({ message : `Result Successfully added to ${this.name}`, type: 'success' });
	}
	catch (err) {
		return { message : `Error: ${err}`, type: 'error' };
	}
};

ActionSchema.methods.addEffect = async function(effect) {
	// Expects effect: { description, type, asset <<Asset ref>>, action <<Action ref>>, other }

	if (!effect.description) throw Error('Effects must have a description..');
	if (!effect.type) throw Error('Effects must have type attched..');
	// if (!effect[effect.type.toLowerCase()]) throw Error(`${effect.type} effects must have ${effect.type.toLowerCase()} attached...`);

	this.effects.push(effect);
	this.markModified('effects');
	const action = await this.save();
	await action.populateMe();

	nexusEvent.emit('respondClient', 'update', [ action ]);
	console.log(`Effect Successfully added to ${action.name}`);
	return ({ message : `Effect Successfully added to ${action.name}`, type: 'success' });

};

ActionSchema.methods.addAttachment = async function(attachment) {
	if (!attachment.title) throw Error('Attachments must have a title');

	this.attachments.push(attachment);
	this.markModified('attachments');
	const action = await this.save();

	await action.populateMe();
	nexusEvent.emit('respondClient', 'update', [ action ]);
	console.log(`Attachment successfully added to ${action.name}`);

	return ({ message : `Attachment added to ${action.name}`, type: 'success' });
};

ActionSchema.methods.populateMe = async function() {
	// TODO: THIS IS A CORRECT POPULATE!!!!
	await this.populate([{
		path: 'comments',
		populate: { path: 'commentor', select: 'characterName profilePicture' }
	}, { path: 'creator', select: 'characterName username playerName profilePicture' }]);
};

const Action = mongoose.model('Action', ActionSchema);

module.exports = { Action };