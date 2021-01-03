const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const validateObjectId = require('../../middleware/util/validateObjectId');
const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging

// Agent Model - Using Mongoose Model
const { Character } = require('../../models/character'); // Agent Model
const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');
const characters = require('../../config/characterList');

// @route   GET api/characters
// @Desc    Get all characters
// @access  Public
router.get('/', async function(req, res) {
	logger.info('GET Route: api/character requested...');
	try {
		const char = await Character.find();

		res.status(200).json(char);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   GET api/character/:id
// @Desc    Get a single Character by ID
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
	logger.info('GET Route: api/aircraft/:id requested...');
	const id = req.params.id;
	try {
		const character = await Character.findById(id);
		if (character != null) {
			res.status(200).json(character);
		}
		else {
			nexusError(`The Character with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   POST api/characters
// @Desc    Post a new Character
// @access  Public
router.post('/', async function(req, res) {
	logger.info('POST Route: api/character call made...');

	try {
		let newCharacter = new Character(req.body);

		//	await newAgent.validateAgent();
		const docs = await Character.find({ characterName: req.body.characterName });

		if (docs.length < 1) {
			newCharacter = await newCharacter.save();
			logger.info(`${newCharacter.characterName} created.`);
			res.status(200).json(newCharacter);
		}
		else {
			nexusError(`A character named ${newCharacter.characterName} already exists!`, 400);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   DELETE api/characters/:id
// @Desc    Delete an character
// @access  Public
router.delete('/:id', async function(req, res) {
	logger.info('DEL Route: api/agent:id call made...');
	try {
		const id = req.params.id;
		let character = await Character.findById(id);
		if (character != null) {
			// await character.stripUpgrades();
			character = await Character.findByIdAndDelete(id);
			logger.info(`${character.name} with the id ${id} was deleted!`);
			res.status(200).send(`${character.name} with the id ${id} was deleted!`);
		}
		else {
			nexusError(`No character with the id ${id} exists!`, 400);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   PATCH api/characters/deleteAll
// @desc    Delete All Agents
// @access  Public
router.patch('/deleteAll', async function(req, res) {
	let airDelCount = 0;
	for await (const agent of Character.find()) {
		const id = agent.id;
		try {
			const agentDel = await Character.findByIdAndRemove(id);
			if (agentDel == null) {
				res.status(404).send(`The Character with the ID ${id} was not found!`);
			}
			else {
				airDelCount += 1;
			}
		}
		catch (err) {
			nexusError(`${err.message}`, 500);
		}
	}
	return res.status(200).send(`We wiped out ${airDelCount} Characters`);
});

// game routes
router.post('/initCharacters', async function(req, res) {
	logger.info('POST Route: api/character call made...');

	try {
		for (const char of characters) {
			let newCharacter = new Character(char);

			//	await newAgent.validateAgent();
			const docs = await Character.find({ characterName: char.characterName });

			if (docs.length < 1) {
				newCharacter = await newCharacter.save();
				logger.info(`${newCharacter.characterName} created.`);
			}
			else {
				console.log(`${newCharacter.characterName} already exists!\n`);
			}
		}
		res.status(200).send('All done');
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});


module.exports = router;
