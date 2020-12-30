const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const validateObjectId = require('../../middleware/util/validateObjectId');
const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging

// Agent Model - Using Mongoose Model
const { Action } = require('../../models/action'); // Agent Model
const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');

// @route   GET api/actions
// @Desc    Get all actions
// @access  Public
router.get('/', async function(req, res) {
	logger.info('GET Route: api/action requested...');
	try {
		const agents = await Action.find();
		res.status(200).json(agents);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   GET api/actions/:id
// @Desc    Get a single Action by ID
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
	logger.info('GET Route: api/aircraft/:id requested...');
	const id = req.params.id;
	try {
		const action = await Action.findById(id);
		if (action != null) {
			res.status(200).json(action);
		}
		else {
			nexusError(`The Action with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   POST api/actions
// @Desc    Post a new action
// @access  Public
router.post('/', async function(req, res) {
	logger.info('POST Route: api/action call made...');

	try {
		let newElement = new Action(req.body);

		//	await newAgent.validateAgent();
		const docs = await Action.find({ intent: req.body.intent });

		if (docs.length < 1) {
			newElement = await newElement.save();
			logger.info(`${newElement.intent} created.`);
			res.status(200).json(newElement);
		}
		else {
			nexusError(`An action with intent ${newElement.intent} already exists!`, 400);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   DELETE api/actions/:id
// @Desc    Delete an action
// @access  Public
router.delete('/:id', async function(req, res) {
	logger.info('DEL Route: api/agent:id call made...');
	try {
		const id = req.params.id;
		let element = await Action.findById(id);
		if (element != null) {
			element = await Action.findByIdAndDelete(id);
			logger.info(`Action with the id ${id} was deleted!`);
			res.status(200).send(`Action with the id ${id} was deleted!`);
		}
		else {
			nexusError(`No action with the id ${id} exists!`, 400);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   PATCH api/actions/deleteAll
// @desc    Delete All actions
// @access  Public
router.patch('/deleteAll', async function(req, res) {
	let delCount = 0;
	for await (const element of Action.find()) {
		const id = element.id;
		try {
			const elementDel = await Action.findByIdAndRemove(id);
			if (elementDel == null) {
				res.status(404).send(`The Action with the ID ${id} was not found!`);
			}
			else {
				delCount += 1;
			}
		}
		catch (err) {
			nexusError(`${err.message}`, 500);
		}
	}
	return res.status(200).send(`We wiped out ${delCount} Actions`);
});

// ~~~Game Routes~~~
router.post('/newAction', async function(req, res) {
	logger.info('POST Route: api/action call made...');

	try {
		let newElement = new Action(req.body);
		newElement.dieResult = 0;

		//	await newAgent.validateAgent();
		const docs = await Action.find({ intent: req.body.intent });

		if (docs.length < 1) {
			newElement = await newElement.save();
			logger.info(`${newElement.intent} created.`);
			res.status(200).json(newElement);
		}
		else {
			nexusError(`An action with intent ${newElement.intent} already exists!`, 400);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

module.exports = router;
