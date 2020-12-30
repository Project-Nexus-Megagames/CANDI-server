const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const validateObjectId = require('../../middleware/util/validateObjectId');
const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging

// Agent Model - Using Mongoose Model
const { Player } = require('../../models/player'); // Agent Model
const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');
const characters = require('../../config/playerList');

// @route   GET api/agents
// @Desc    Get all agents
// @access  Public
router.get('/', async function(req, res) {
	logger.info('GET Route: api/player requested...');
	try {
		const agents = await Player.find();

		res.status(200).json(agents);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   GET api/player/:id
// @Desc    Get a single Player by ID
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
	logger.info('GET Route: api/aircraft/:id requested...');
	const id = req.params.id;
	try {
		const player = await Player.findById(id);
		if (player != null) {
			res.status(200).json(player);
		}
		else {
			nexusError(`The Player with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   POST api/players
// @Desc    Post a new Player
// @access  Public
router.post('/', async function(req, res) {
	logger.info('POST Route: api/player call made...');

	try {
		let newPlayer = new Player(req.body);

		//	await newAgent.validateAgent();
		const docs = await Player.find({ characterName: req.body.characterName });

		if (docs.length < 1) {
			newPlayer = await newPlayer.save();
			logger.info(`${newPlayer.characterName} created.`);
			res.status(200).json(newPlayer);
		}
		else {
			nexusError(`A player named ${newPlayer.characterName} already exists!`, 400);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   DELETE api/players/:id
// @Desc    Delete an player
// @access  Public
router.delete('/:id', async function(req, res) {
	logger.info('DEL Route: api/agent:id call made...');
	try {
		const id = req.params.id;
		let player = await Player.findById(id);
		if (player != null) {
			// await player.stripUpgrades();
			player = await Player.findByIdAndDelete(id);
			logger.info(`${player.name} with the id ${id} was deleted!`);
			res.status(200).send(`${player.name} with the id ${id} was deleted!`);
		}
		else {
			nexusError(`No player with the id ${id} exists!`, 400);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   PATCH api/agents/deleteAll
// @desc    Delete All Agents
// @access  Public
router.patch('/deleteAll', async function(req, res) {
	let airDelCount = 0;
	for await (const agent of Player.find()) {
		const id = agent.id;
		try {
			const agentDel = await Player.findByIdAndRemove(id);
			if (agentDel == null) {
				res.status(404).send(`The Player with the ID ${id} was not found!`);
			}
			else {
				airDelCount += 1;
			}
		}
		catch (err) {
			nexusError(`${err.message}`, 500);
		}
	}
	return res.status(200).send(`We wiped out ${airDelCount} Players`);
});

// game routes
router.post('/initPlayers', async function(req, res) {
	logger.info('POST Route: api/player call made...');

	try {
		for (const char of characters) {
			let newPlayer = new Player(char);

			//	await newAgent.validateAgent();
			const docs = await Player.find({ characterName: char.characterName });

			if (docs.length < 1) {
				newPlayer = await newPlayer.save();
				logger.info(`${newPlayer.characterName} created.`);
			}
			else {
				console.log(`${newPlayer.characterName} already exists!\n`);
			}
		}
		res.status(200).send('All done');
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});


module.exports = router;
