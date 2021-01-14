const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server
const nexusEvent = require('../../middleware/events/events'); // Local event triggers

const validateObjectId = require('../../middleware/util/validateObjectId');
const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging

// Agent Model - Using Mongoose Model
const { Character } = require('../../models/character'); // Agent Model
const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');
const characters = require('../../config/characterList');
const { Asset } = require('../../models/asset');

// @route   GET api/characters
// @Desc    Get all characters
// @access  Public
router.get('/', async function(req, res) {
	logger.info('GET Route: api/character requested...');
	try {
		const char = await Character.find().populate('assets').populate('traits').populate('wealth').populate('lentAssets');

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
	logger.info('GET Route: api/character/:id requested...');
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
			nexusEvent.emit('updateCharacters');
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
			nexusEvent.emit('updateCharacters');
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
	nexusEvent.emit('updateCharacters');
	return res.status(200).send(`We wiped out ${airDelCount} Characters`);
});

// game routes
router.post('/initCharacters', async function(req, res) {
	logger.info('POST Route: api/character call made...');

	try {
		for (const char of characters) {
			let newCharacter = new Character(char);
			const wealth = {
				name: `${newCharacter.characterName}'s Wealth`,
				description: char.wealthLevel,
				model: 'Wealth'
			};
			const asset = new Asset(wealth);
			newCharacter.wealth = asset;
			asset.save();
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
		nexusEvent.emit('updateCharacters');
		res.status(200).send('All done');
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   GET api/character/:id
// @Desc    Get a single Character by ID
// @access  Public
router.patch('/byUsername', async (req, res) => {
	logger.info('GET Route: api/characters/byUsername requested...');
	const { username } = req.body;
	try {
		const data = await Character.findOne({ username }).populate('assets').populate('traits').populate('lentAssets').populate('wealth');
		if (data === null || data.length < 1) {
			console.log(`Could not find a character for username "${username}"`);
			// nexusError(`Could not find a character for id "${id}"`, 404);
			res.status(200).json(data);
		}
		else if (data.length > 1) {
			nexusError(`Found multiple characters for username ${username}`, 404);
		}
		else {
			res.status(200).json(data);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

router.patch('/modify', async (req, res) => {
	logger.info('GET Route: api/characters/modify requested...');
	const { id, effort, email, worldAnvil, tag, timeZone, wealth, icon, popsupport, bio, characterName } = req.body.data;
	try {
		let data = await Character.findById(id).populate('wealth');
		let wealthAss = await Asset.findById(data.wealth._id);
		if (data === null) {
			nexusError(`Could not find a character for id "${id}"`, 404);
		}
		else if (data.length > 1) {
			nexusError(`Found multiple characters for id ${id}`, 404);
		}
		else {
			data.email = email;
			data.characterName = characterName;
			data.worldAnvil = worldAnvil;
			data.tag = tag;
			data.timeZone = timeZone;
			data.effort = effort;

			wealthAss.description = wealth;

			data.icon = icon;
			data.popsupport = popsupport;
			data.bio = bio;

			wealthAss = wealthAss.save();
			data = await data.save();
			nexusEvent.emit('updateCharacters');
			nexusEvent.emit('updateAssets');
			res.status(200).json(data);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

router.patch('/support', async (req, res) => {
	logger.info('GET Route: api/characters/modify requested...');
	const { id, supporter } = req.body;
	try {
		let data = await Character.findById(id).populate('wealth');
		if (data === null) {
			nexusError(`Could not find a character for id "${id}"`, 404);
		}
		else if (data.length > 1) {
			nexusError(`Found multiple characters for id ${id}`, 404);
		}
		else {
			if (data.supporters.some(el => el === supporter)) {
				const index = data.supporters.indexOf(supporter);
				data.supporters.splice(index, 1);
			}
			else {
				data.supporters.push(supporter);
			}
			data = await data.save();
			nexusEvent.emit('updateCharacters');
			res.status(200).json(data);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

router.patch('/memory', async (req, res) => {
	logger.info('GET Route: api/characters/modify requested...');
	const { id, memories } = req.body.data;
	try {
		let data = await Character.findById(id);
		if (data === null) {
			nexusError(`Could not find a character for id "${id}"`, 404);
		}
		else if (data.length > 1) {
			nexusError(`Found multiple characters for id ${id}`, 404);
		}
		else {
			data.memories = memories;

			data = await data.save();
			nexusEvent.emit('updateCharacters');
			res.status(200).json(data);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

router.patch('/newAsset', async (req, res) => {
	logger.info('GET Route: api/characters/modify requested...');
	const { id, asset } = req.body.data;
	try {
		let data = await Character.findById(id);
		if (data === null) {
			nexusError(`Could not find a character for id "${id}"`, 404);
		}
		else if (data.length > 1) {
			nexusError(`Found multiple characters for id ${id}`, 404);
		}
		else {
			let newAsset = new Asset(asset);

			if (newAsset.model === 'Trait') {
				data.traits.push(newAsset);
			}
			else {
				data.assets.push(newAsset);
			}
			newAsset = await newAsset.save();
			data = await data.save();
			nexusEvent.emit('updateCharacters');
			res.status(200).json(data);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

module.exports = router;
