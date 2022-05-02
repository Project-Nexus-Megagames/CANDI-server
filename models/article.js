const mongoose = require('mongoose'); // Mongo DB object modeling module
const { logger } = require('../middleware/log/winston'); // Loging midddleware

// Function Import
const nexusEvent = require('../middleware/events/events');

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const ArticleSchema = new Schema({
	model: { type: String, default: 'Article' },
	publisher: { type: Schema.Types.ObjectId, ref: 'Character' },
	timestamp: {
		turn: { type: String },
		phase: { type: String },
		turnNum: { type: Number },
		clock: { type: String }
	},
	location: { type: Schema.Types.ObjectId, ref: 'Location' },
	dateline: { type: String },
	headline: { type: String, required: true, minlength: 1, maxlength: 100 },
	body: { type: String, minlength: 1, maxlength: 1000 },
	tags: [{ type: String }],
	status: [{ type: String }],
	imageSrc: { type: String },
	reactions: [{
		user: { type: String },
		emoji: { type: String }
	}],
	comments: [{
		user: { type: String },
		comment: { type: String },
		timestamp: {
			turn: { type: String },
			phase: { type: String },
			turnNum: { type: Number },
			clock: { type: String }
		}
	}]
}, { timestamps: true });

ArticleSchema.statics.post = async function(article) {
	const Article = mongoose.model('article');
	let newArticle = new Article(article);

	newArticle.date = Date.now();
	newArticle.timestamp = 'TODO put timestamp here';


	await newArticle.validateArticle();
	newArticle = await newArticle.save();
	newArticle = await newArticle.populateMe();

	nexusEvent.emit('request', 'create', [ newArticle ]);
	logger.info(`The ${this.headline} article has been created`);
	return newArticle;
};

ArticleSchema.methods.edit = async function(articleUpdate) {
	this.publisher = articleUpdate.publisher;
	this.location = articleUpdate.location;
	this.headline = articleUpdate.headline;
	this.body = articleUpdate.body;
	this.tags = articleUpdate.tags;
	this.imageSrc = articleUpdate.imageSrc;

	await this.validateArticle();
	let article = await this.save();
	article = await article.populateMe();

	nexusEvent.emit('request', 'update', [ article ]);
	logger.info(`The ${this.headline} article has been edited`);
	return article;
};

ArticleSchema.methods.publish = async function() {
	this.published = true;

	let article = await this.save();
	article = await article.populateMe();

	nexusEvent.emit('request', 'update', [ article ]);
	logger.info(`The ${this.headline} article has been published`);
	return article;
};

ArticleSchema.methods.react = async function(user, emoji) {
	if (user == undefined) throw Error(`An undefined user cannot react to ${this.headline}`);
	if (emoji == undefined) throw Error(`${user} cannot react to ${this.headline} with an undefined emoji`);

	const index = this.reactions.findIndex(reaction => reaction.user == user && reaction.emoji == emoji);
	if (index >= 0) throw Error(`${user} has already reacted to ${this.headline} with ${emoji}`);

	this.reactions.push({
		user: user,
		emoji: emoji
	});

	let article = await this.save();
	article = await article.populateMe();

	nexusEvent.emit('request', 'update', [ article ]);
	logger.info(`The ${this.headline} article has been reacted to by ${user} with ${emoji}`);
	return article;
};

ArticleSchema.methods.unreact = async function(user, emoji) {
	if (user == undefined) throw Error(`An undefined user cannot unreact to ${this.headline}`);
	if (emoji == undefined) throw Error(`${user} cannot unreact to ${this.headline} with an undefined emoji`);

	const index = this.reactions.findIndex(reaction => reaction.user == user && reaction.emoji == emoji);
	if (index < 0) throw Error(`${user} has not reacted to ${this.headline} with ${emoji}`);

	const reactionId = this.reactions[index]._id;

	this.reactions.pull({
		_id: reactionId
	});

	let article = await this.save();
	article = await article.populateMe();

	nexusEvent.emit('request', 'update', [ article ]);
	logger.info(`The ${this.headline} article has been unreacted to by ${user} with ${emoji}`);
	return article;
};

ArticleSchema.methods.comment = async function(user, comment) {
	if (user == undefined) throw Error(`An undefined user cannot comment on ${this.headline}`);
	if (comment == undefined) throw Error(`${user} cannot react to ${this.headline} with an undefined comment`);

	const timestamp = 'TODO put timestamp here';

	this.comments.push({
		user: user,
		comment: comment,
		timestamp: timestamp
	});

	let article = await this.save();
	article = await article.populateMe();

	nexusEvent.emit('request', 'update', [ article ]);
	logger.info(`The ${this.headline} article has been commented on by ${user}`);
	return article;
};

ArticleSchema.methods.deleteComment = async function(id) {
	if (id == undefined) throw Error(`Cannot delete a comment with an undefined id on ${this.headline}`);

	const index = this.comments.findIndex(comment => comment._id == id);
	if (index < 0) throw Error(`There does not exist a comment with the id ${id} on ${this.headline}`);

	this.comments.pull({
		_id: id
	});

	let article = await this.save();
	article = await article.populateMe();

	nexusEvent.emit('request', 'update', [ article ]);
	logger.info(`The ${this.headline} article has had the comment with the id ${id} deleted`);
	return article;
};

ArticleSchema.methods.delete = async function() {
	this.hidden = true;

	let article = await this.save();
	article = await article.populateMe();

	nexusEvent.emit('request', 'update', [ article ]);
	logger.info(`The ${this.headline} article has been ''deleted''`);

	return article;
};

ArticleSchema.methods.populateMe = async function() {
	return this.populate('publisher', 'name shortName')
		.populate('location', 'name dateline')
		.execPopulate();
};

const Article = mongoose.model('article', ArticleSchema);

module.exports = { Article };
