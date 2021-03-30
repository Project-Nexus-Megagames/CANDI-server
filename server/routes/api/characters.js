const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server
const nexusEvent = require('../../middleware/events/events'); // Local event triggers
const axios = require('axios');

const validateObjectId = require('../../middleware/util/validateObjectId');
const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging

// Agent Model - Using Mongoose Model
const { Character } = require('../../models/character'); // Agent Model
const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');
const characters = require('../../config/characterList');
const assets = require('../../config/startingassets');
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
			const char = await Character.find().populate('assets').populate('traits').populate('wealth').populate('lentAssets');
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
				model: 'Wealth',
				uses: 2
			};
			const asset = new Asset(wealth);
			newCharacter.wealth = asset;
			//	await newAgent.validateAgent();
			const docs = await Character.find({ characterName: char.characterName });

			if (docs.length < 1) {
				newCharacter = await newCharacter.save();
				asset.save();
				logger.info(`${newCharacter.characterName} created.`);
			}
			else {
				console.log(`${newCharacter.characterName} already exists!\n`);
			}
		}

		for (const ass of assets) {
			const character = await Character.findOne({ characterName: ass.owner });
			if (character) {
				const newAsset = new Asset(ass);
				newAsset.model === 'Trait' ? character.traits.push(newAsset) : character.assets.push(newAsset);
				newAsset.save();
				character.save();
				logger.info(`${newAsset.name} created.`);
			}
			else {
				console.log(`Could not find ${ass.owner}!\n`);
			}
		}

		// Special Assets for Angels n Deamons
		const angelAss = new Asset({ model: 'Trait', name: 'Angelic Blessing', description: 'You have a limited ability to command the matter of the afterlife itself. Examples of this include  temporarily rearranging the layout of streets and buildings, changing the gloom briefly into day creating short-lived golems out of grave-dirt, changing that dirt into mud or fire (though, of course, you can\'t hurt a shade unless they attack first).' });
		let judgementAngel = await Character.findOne({ characterName: 'The Angel of Judgement' });
		const dawnAngel = await Character.findOne({ characterName: 'The Angel of Dawn' });

		judgementAngel.traits.push(angelAss);
		dawnAngel.traits.push(angelAss);

		judgementAngel = await judgementAngel.save();
		dawnAngel.save();
		angelAss.save();

		const demonAss = new Asset({ model: 'Trait', name: 'Demonic  Blessing', description: 'A tiny extension of the First Demon’s power that might take the form of additional abilities or literal demonic support for the recipient.' });
		let mercy = await Character.findOne({ characterName: 'The Demon of Mercy' });
		let dusk = await Character.findOne({ characterName: 'The Demon of Dusk' });

		mercy.traits.push(demonAss);
		dusk.traits.push(demonAss);

		dusk = await dusk.save();
		mercy = await mercy.save();
		demonAss.save();


		nexusEvent.emit('updateCharacters');
		res.status(200).send('All done');
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// register
router.patch('/register', async (req, res) => {
	logger.info('GET Route: api/characters/register requested...');
	const { character, username } = req.body.data;
	try {
		let data = await Character.findById(character).populate('wealth');

		if (data === null) {
			nexusError(`Could not find a character for id "${character}"`, 404);
		}
		else {
			data.username = username;
			data = await data.save();
			nexusEvent.emit('updateCharacters');
			res.status(200).json(data);

			const emailStuff = {
				from: 'Afterlife Registration',
				to: data.email,
				subject: 'Afterlife Registration',
				html: `<p>Dear ${data.playerName},</p> <p> You have been successfully registered for the Afterlife App, and can now log in. Make sure you log in with either the email or username you used to register on the Nexus Portal.</p> <p><b>Note:</b> The webpage may take a moment to load on your first log-in. </p> <p>Have fun!</p> <p>Your Character: ${data.characterName} </p> https://afterlife-app.herokuapp.com/`
			};
			await	axios.post('https://nexus-central-server.herokuapp.com/nexus/email', emailStuff);
		}

	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

router.patch('/scrubAsset', async (req, res) => {
	logger.info('PATCH Route: api/characters/scrubAsset requested...');
	try {
		let mercy = await Character.findOne({ characterName: 'The Demon of Mercy' });
		let dusk = await Character.findOne({ characterName: 'The Demon of Dusk' });
		const demonAss = new Asset({
			name: 'Demonic  Blessing',
			description: 'A tiny extension of the First Demon’s power that might take the form of additional abilities or literal demonic support for the recipient.',
			uses: 999,
			model: 'Asset'
		});
		dusk.traits = [];
		mercy.traits = [];

		dusk.assets.push(demonAss);
		mercy.assets.push(demonAss);
		dusk = await dusk.save();
		mercy = await mercy.save();

		await demonAss.save();

		nexusEvent.emit('updateCharacters');
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

router.patch('/test', async (req, res, next) => {
	logger.info('PATCH Route: api/characters/test requested...');
	if (req.timedout) {
		next();
	}
	else {
		try {
			console.log('test');
		}
		catch (err) {
			httpErrorHandler(res, err);
		}
	}
});


module.exports = router;
