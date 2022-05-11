const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server
const nexusEvent = require('../../middleware/events/events'); // Local event triggers

const validateObjectId = require('../../middleware/util/validateObjectId');
const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging

// Agent Model - Using Mongoose Model
const { Character } = require('../../models/character'); // Agent Model
const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');
const { characters, npcs } = require('../../config/startingCharacters');
const { Asset } = require('../../models/asset');

// @route   GET api/characters
// @Desc    Get all characters
// @access  Public
router.get('/', async function(req, res, next) {
	logger.info('GET Route: api/character requested...');
	if (req.timedout) {
		next();
	}
	else {
		try {
			const char = await Character.find().populate('assets').populate('lentAssets').populate('unlockedBy', 'characterName playerName');
			res.status(200).json(char);
		}
		catch (err) {
			logger.error(err.message, { meta: err.stack });
			res.status(500).send(err.message);
		}
	}
});

// @route   GET api/character/:id
// @Desc    Get a single Character by ID
// @access  Public
router.get('/:id', validateObjectId, async (req, res, next) => {
	logger.info('GET Route: api/character/:id requested...');
	if (req.timedout) {
		next();
	}
	else {
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
	}
});


// @route   POST api/characters
// @Desc    Post a new Character
// @access  Public
router.post('/', async function(req, res, next) {
	logger.info('POST Route: api/character call made...');
	if (req.timedout) {
		next();
	}
	else {
		try {
			let newCharacter = new Character(req.body);
			const wealth = {
				name: `${newCharacter.characterName}'s Wealth`,
				description: req.body.wealthLevel,
				model: 'Wealth',
				uses: 2
			};
			const asset = new Asset(wealth);
			newCharacter.wealth = asset;

			//	await newAgent.validateAgent();
			const docs = await Character.find({ characterName: req.body.characterName });

			if (docs.length < 1) {
				asset.save();
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
	}
});

// @route   DELETE api/characters/:id
// @Desc    Delete an character
// @access  Public
router.delete('/:id', async function(req, res, next) {
	logger.info('DEL Route: api/agent:id call made...');
	if (req.timedout) {
		next();
	}
	else {
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
	}

});

// @route   PATCH api/characters/deleteAll
// @desc    Delete All Agents
// @access  Public
router.patch('/deleteAll', async function(req, res) {
	const data = await Character.deleteMany();
	return res.status(200).send(`We wiped out ${data.deletedCount} Characters!`);
});

// game routes
router.post('/initCharacters', async function(req, res) { // initializes characters based on /config/startingCharacters.js.
	logger.info('POST Route: api/character call made...');

	const arr = ['Asset', 'Trait', 'Wealth', 'Power'];

	try {
		let npcCount = 0;
		let charCount = 0;
		for (const char of characters) {
			let newCharacter = new Character(char);
			const docs = await Character.find({ characterName: char.characterName });

			if (docs.length < 1) {
				charCount++;
				newCharacter = await newCharacter.save();

				for (const el of arr) {
					let ass = new Asset({
						name: `${newCharacter.characterName}'s' ${el}`,
						description: `${newCharacter.characterName}'s' ${el}`,
						type: el,
						ownerCharacter: newCharacter._id
					});
					ass = await ass.save();
				}

				logger.info(`${newCharacter.characterName} created.`);
			}
			else {
				console.log(`${newCharacter.characterName} already exists!\n`);
			}
		}

		for (const npc of npcs) {
			let newCharacter = new Character(npc);
			//	await newAgent.validateAgent();
			const docs = await Character.find({ characterName: npc.characterName });

			if (docs.length < 1) {
				newCharacter = await newCharacter.save();
				npcCount++;
				logger.info(`${newCharacter.characterName} created.`);
			}
			else {
				console.log(`${newCharacter.characterName} already exists!\n`);
			}
		}

		nexusEvent.emit('updateCharacters');
		logger.info(`Created ${charCount} Characters and ${npcCount} NPCs.`);
		res.status(200).send('All done');
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

router.patch('/cleanSupporters', async (req, res, next) => {
	logger.info('PATCH Route: api/characters/cleanSupporters requested...');
	if (req.timedout) {
		next();
	}
	else {
		const { id } = req.body;
		try {
			const character = await Character.findById(id);
			const record = [];

			for (const supporter of character.supporters) {
				if (!record.some(el => el === supporter)) {
					record.push(supporter);
				}
			}

			character.supporters = record;
			await character.save();
			res.status(200).json(character);
		}
		catch (err) {
			httpErrorHandler(res, err);
		}
	}
});

module.exports = router;
