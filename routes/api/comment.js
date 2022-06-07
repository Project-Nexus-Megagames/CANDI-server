const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server
const nexusEvent = require('../../middleware/events/events'); // Local event triggers

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging

const validateObjectId = require('../../middleware/util/validateObjectId');
// Agent Model - Using Mongoose Model
const { Comment } = require('../../models/comment'); // Agent Model
const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');


// @route   GET api/comments
// @Desc    Get all comments
// @access  Public
router.get('/', async function(req, res, next) {
	logger.info('GET Route: api/comments requested: get all');
	if (req.timedout) {
		next();
	}
	else {
		try {
			const locat = await Comment.find();
			res.status(200).json(locat);
		}
		catch (err) {
			logger.error(err.message, { meta: err.stack });
			res.status(500).send(err.message);
		}
	}
});

// @route   GET api/comments/:id
// @Desc    Get a single Comment by ID
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
	logger.info('GET Route: api/comment/:id requested...');
	const id = req.params.id;
	try {
		const comment = await Comment.findById(id);
		if (comment != null) {
			res.status(200).json(comment);
		}
		else {
			nexusError(`The comment with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   POST api/comments
// @Desc    Post a new comment
// @access  Public
router.post('/', async function(req, res, next) {
	logger.info('POST Route: api/comment call made...');
	if (req.timedout) {
		next();
	}
	else {
		const { data } = req.body;
		try {
			let newElement = new Comment(data);
			const docs = await Comment.find({ intent: data.intent });

			if (docs.length < 1) {
				newElement = await newElement.save();
				const comment = await Comment.findById(newElement._id).populate('creator');
				logger.info(`Comment "${newElement.intent}" created.`);
				res.status(200).json(comment);
			}
			else {
				nexusError(`An comment with intent ${newElement.intent} already exists!`, 400);
			}
		}
		catch (err) {
			httpErrorHandler(res, err);
		}
	}
});

// @route   DELETE api/comments/:id
// @Desc    Delete an comment
// @access  Public
// DEPRECIATED
router.delete('/:id', async function(req, res, next) {
	logger.info('DEL Route: api/agent:id call made...');
	if (req.timedout) {
		next();
	}
	else {
		try {
			const id = req.params.id;
			let element = await Comment.findById(id);
			if (element != null) {
				element = await Comment.findByIdAndDelete(id);

				logger.info(`Comment with the id ${id} was deleted!`);
				nexusEvent.emit('updateComments');
				res.status(200).send(`Comment with the id ${id} was deleted!`);
			}
			else {
				nexusError(`No comment with the id ${id} exists!`, 400);
			}
		}
		catch (err) {
			httpErrorHandler(res, err);
		}
	}
});

// @route   PATCH api/comments/deleteAll
// @desc    Delete All comments
// @access  Public

router.patch('/deleteAll', async function(req, res) {
	const data = await Comment.deleteMany();
	return res.status(200).send(`We wiped out ${data.deletedCount} Comments!`);
});

module.exports = router;
