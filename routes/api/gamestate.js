const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const validateObjectId = require('../../middleware/util/validateObjectId'); // Middleware that validates object ID's in HTTP perameters
const httpErrorHandler = require('../../middleware/util/httpError'); // Middleware that parses errors and status for Express responses
const nexusError = require('../../middleware/util/throwError'); // Project Nexus middleware for error handling

// Mongoose Model Import
const { GameState } = require('../../models/gamestate');

// @route   GET /gamestate
// @Desc    Get all GameStates
// @access  Public
router.get('/', async function(req, res, next) {
	logger.info('GET Route: api/gamestate requested...');
	if (req.timedout) {
		next();
	}
	else {
		try {
			const gamestates = await GameState.findOne();
			res.status(200).json(gamestates);
		}
		catch (err) {
			logger.error(err.message, { meta: err.stack });
			res.status(500).send(err.message);
		}
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

setInterval(async () => {
	const gamestate = await GameState.findOne();
	if (gamestate.discovered) {
		gamestate.hunger = gamestate.hunger - 13;
		gamestate.happiness = gamestate.happiness - 13;
		await gamestate.save();
		console.log('hi');
	}
}, 10000);

module.exports = router;