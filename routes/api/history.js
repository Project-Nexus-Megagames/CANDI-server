const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const validateObjectId = require('../../middleware/util/validateObjectId'); // Middleware that validates object ID's in HTTP perameters
const httpErrorHandler = require('../../middleware/util/httpError'); // Middleware that parses errors and status for Express responses
const nexusError = require('../../middleware/util/throwError'); // Project Nexus middleware for error handling

// Mongoose Model Import
const { History } = require('../../models/history');

// @route   GET /history
// @Desc    Get all Historys
// @access  Public
router.get('/', async function(req, res, next) {
	logger.info('GET Route: api/history requested...');
	if (req.timedout) {
		next();
	}
	else {
		try {
			const historys = await History.findOne();
			res.status(200).json(historys);
		}
		catch (err) {
			logger.error(err.message, { meta: err.stack });
			res.status(500).send(err.message);
		}
	}
});

// @route   GET /history/:id
// @Desc    Get historys by id
// @access  Public
router.get('/:id', validateObjectId, async function(req, res) {
	logger.info('GET Route: api/history/:id requested...');
	const id = req.params.id;

	try {
		const history = await History.findById(req.history._id);

		if (history != null) {
			logger.info(`Verifying ${history.historyname}`);
			res.status(200).json(history);
		}
		else {
			nexusError(`The history with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   POST /history
// @Desc    Post a new History
// @access  Public
router.post('/', async function(req, res) {
	logger.info('POST Route: api/history call made...');
	let newHistory = new History(req.body);
	const { tag } = req.body;

	try {
		const docs = await History.find({ tag });

		if (docs.length < 1) {
			newHistory = await newHistory.save();

			logger.info(`History ${tag} created...`);
			res.status(200).json(newHistory);
		}
		else {
			logger.info(`History with the tag: ${tag} already registered...`);
			nexusError(`History with the tag: ${tag} already registered...`, 400);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   DELETE api/history/:id
// @Desc    Delete one history
// @access  Public
router.delete('/:id', validateObjectId, async (req, res) => {
	logger.info('DEL Route: api/history/:id call made...');
	const id = req.params.id;

	try {
		const history = await History.findByIdAndRemove(id);

		if (history != null) {
			logger.info(`The history with the id ${id} was deleted!`);
			res.status(200).json(history);
		}
		else {
			nexusError(`The history with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   PATCH /historys/deleteAll
// @desc    Delete All Historys
// @access  Public
router.patch('/deleteAll', async function(req, res) {
	const data = await History.deleteMany();
	console.log(data);
	return res.status(200).send(`We wiped out ${data.deletedCount} Historys!`);
});

module.exports = router;