const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server
const nexusEvent = require('../../middleware/events/events'); // Local event triggers

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const validateObjectId = require('../../middleware/util/validateObjectId'); // Middleware that validates object ID's in HTTP perameters
const httpErrorHandler = require('../../middleware/util/httpError'); // Middleware that parses errors and status for Express responses
const nexusError = require('../../middleware/util/throwError'); // Project Nexus middleware for error handling

// Mongoose Model Import
const { GameState } = require('../../models/gamestate');
const { Asset } = require('../../models/asset'); // Agent Model
const { Action } = require('../../models/action'); // Agent Model
const { Character } = require('../../models/character');

// @route   GET /gamestate
// @Desc    Get all GameStates
// @access  Public
router.get('/', async function(req, res) {
	logger.info('GET Route: api/gamestate requested...');

	try {
		const gamestates = await GameState.findOne();
		res.status(200).json(gamestates);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   GET /gamestate/:id
// @Desc    Get gamestates by id
// @access  Public
router.get('/:id', validateObjectId, async function(req, res) {
	logger.info('GET Route: api/gamestate/:id requested...');
	const id = req.params.id;

	try {
		const gamestate = await GameState.findById(req.gamestate._id);

		if (gamestate != null) {
			logger.info(`Verifying ${gamestate.gamestatename}`);
			res.status(200).json(gamestate);
		}
		else {
			nexusError(`The gamestate with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   POST /gamestate
// @Desc    Post a new GameState
// @access  Public
router.post('/', async function(req, res) {
	logger.info('POST Route: api/gamestate call made...');
	let newGameState = new GameState(req.body);
	const { tag } = req.body;

	try {
		const docs = await GameState.find({ tag });

		if (docs.length < 1) {
			newGameState = await newGameState.save();

			logger.info(`GameState ${tag} created...`);
			res.status(200).json(docs);
		}
		else {
			logger.info(`GameState with the tag: ${tag} already registered...`);
			nexusError(`GameState with the tag: ${tag} already registered...`, 400);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   DELETE api/gamestate/:id
// @Desc    Delete one gamestate
// @access  Public
router.delete('/:id', validateObjectId, async (req, res) => {
	logger.info('DEL Route: api/gamestate/:id call made...');
	const id = req.params.id;

	try {
		const gamestate = await GameState.findByIdAndRemove(id);

		if (gamestate != null) {
			logger.info(`The gamestate with the id ${id} was deleted!`);
			res.status(200).json(gamestate);
		}
		else {
			nexusError(`The gamestate with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   PATCH /gamestates/deleteAll
// @desc    Delete All GameStates
// @access  Public
router.patch('/deleteAll', async function(req, res) {
	const data = await GameState.deleteMany();
	console.log(data);
	return res.status(200).send(`We wiped out ${data.deletedCount} GameStates!`);
});

// game routes

router.patch('/modify', async function(req, res) {
	const { round, status, endTime } = req.body.data;
	let data = await GameState.findOne();

	try {
		data.round = round;
		data.status = status;
		data.endTime = endTime,
		data = await data.save();
		console.log(data);
		nexusEvent.emit('updateGamestate');
		res.status(200).json(data);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}

});

router.patch('/closeRound', async function(req, res) {
	const data = await GameState.findOne();
	console.log(data);
	try {
		for (const action of await Action.find({ 'status.draft': true })) {
			action.status.draft = false;
			action.save();
		}

		data.status = 'Resolution';
		await data.save();
		nexusEvent.emit('updateGamestate');
		nexusEvent.emit('updateActions');
		res.status(200).json(data);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

router.patch('/nextRound', async function(req, res) {
	const data = await GameState.findOne();
	console.log(data);
	try {
		for (const asset of await Asset.find({ 'status.lent': true })) {
			asset.status.lent = false;
			asset.currentHolder = null;
			console.log(`Unlending ${asset.name}`);
			asset.save();
		}

		for (const asset of await Asset.find({ 'status.used': true })) {
			asset.status.used = false;
			console.log(`UnUsing ${asset.name}`);
			asset.save();
		}

		for (const character of await Character.find()) {
			character.lentAssets = [];
			character.effort = 3;
			character.save();
		}

		for (const action of await Action.find({ 'status.ready': true })) {
			action.status.ready = false;
			action.status.published = true;

			action.save();
		}

		data.round = data.round + 1;
		data.status = 'Active';
		await data.save();
		nexusEvent.emit('updateGamestate');
		nexusEvent.emit('updateActions');
		nexusEvent.emit('updateCharacters');
		return res.status(200).send('Gamestate pushed! ');
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}

});

module.exports = router;