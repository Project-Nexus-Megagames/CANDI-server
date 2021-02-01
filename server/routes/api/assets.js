const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server
const nexusEvent = require('../../middleware/events/events'); // Local event triggers

const validateObjectId = require('../../middleware/util/validateObjectId');
const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging

// Agent Model - Using Mongoose Model
const { Asset } = require('../../models/asset'); // Agent Model
const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');
const { Character } = require('../../models/character');

// @route   GET api/assets
// @Desc    Get all assets
// @access  Public
router.get('/', async function(req, res) {
	logger.info('GET Route: api/asset requested...');
	try {
		const assets = await Asset.find();

		res.status(200).json(assets);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   GET api/asset/:id
// @Desc    Get a single asset by ID
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
	logger.info('GET Route: api/asset/:id requested...');
	const id = req.params.id;
	try {
		const asset = await Asset.findById(id);
		if (asset != null) {
			res.status(200).json(asset);
		}
		else {
			nexusError(`The asset with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   POST api/assets
// @Desc    Post a new asset
// @access  Public
router.post('/', async function(req, res) {
	logger.info('POST Route: api/asset call made...');

	try {
		let newElement = new Asset(req.body);

		//	await newAgent.validateAgent();
		const docs = await Asset.find({ name: req.body.name });

		if (docs.length < 1) {
			newElement = await newElement.save();
			logger.info(`${newElement.name} created.`);
			res.status(200).json(newElement);
			nexusEvent.emit('updateCharacters');
			nexusEvent.emit('updateAssets');
		}
		else {
			nexusError(`An Asset with name ${newElement.name} already exists!`, 400);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   DELETE api/assets/:id
// @Desc    Delete an asset
// @access  Public
router.delete('/:id', async function(req, res) {
	logger.info('DEL Route: api/agent:id call made...');
	try {
		const id = req.params.id;
		let element = await Asset.findById(id);
		if (element != null) {
			element = await Asset.findByIdAndDelete(id);
			logger.info(`Asset with the id ${id} was deleted!`);
			nexusEvent.emit('updateCharacters');
			nexusEvent.emit('updateAssets');
			res.status(200).send(`Asset with the id ${id} was deleted!`);
		}
		else {
			nexusError(`No asset with the id ${id} exists!`, 400);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   PATCH api/assets/deleteAll
// @desc    Delete All assets
// @access  Public
router.patch('/deleteAll', async function(req, res) {
	let delCount = 0;
	for await (const element of Asset.find()) {
		const id = element.id;
		try {
			const elementDel = await Asset.findByIdAndRemove(id);
			if (elementDel == null) {
				res.status(404).send(`The Asset with the ID ${id} was not found!`);
			}
			else {
				delCount += 1;
			}
		}
		catch (err) {
			nexusError(`${err.message}`, 500);
		}
	}

	for await (const character of Character.find()) {
		character.assets = [];
		character.traits = [];
		character.lentAssets = [];
	}
	nexusEvent.emit('updateCharacters');
	return res.status(200).send(`We wiped out ${delCount} Assets`);
});

// game routes
router.patch('/modify', async (req, res) => {
	logger.info('GET Route: api/characters/modify requested...');
	const { id, name, description, uses } = req.body.data;
	try {
		let data = await Asset.findById(id).populate('wealth');
		if (data === null) {
			nexusError(`Could not find an asset for id "${id}"`, 404);
		}
		else if (data.length > 1) {
			nexusError(`Found multiple characters for id ${id}`, 404);
		}
		else {
			data.name = name;
			data.description = description;
			data.uses = uses;

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


router.post('/add', async function(req, res) {
	logger.info('POST Route: api/asset/add call made...');
	const { character } = req.body;
	try {
		let newElement = new Asset(req.body);
		//	await newAgent.validateAgent();
		const docs = await Asset.find({ name: req.body.name });

		if (docs.length < 1) {
			let char = await Character.findById(character);
			if (!char || char.length < 1) {
				nexusError(`Could not find character with id "${character}"`, 400);
			}
			else {
				newElement.model === 'Asset' ? char.assets.push(newElement) : char.traits.push(newElement);
				char = await char.save();
				newElement = await newElement.save();
				logger.info(`${newElement.name} created.`);
				nexusEvent.emit('updateCharacters');
				nexusEvent.emit('updateAssets');
				res.status(200).json(newElement);
			}

		}
		else {
			nexusError(`An Asset with name ${newElement.name} already exists!`, 400);
		}
	}
	catch (err) {
		nexusError(`${err.message}`, 500);
	}
});

router.post('/lend', async function(req, res) {
	logger.info('POST Route: api/asset/lend call made...');
	const { asset, target, lendingBoolean } = req.body.data;
	try {
		let docs = await Asset.findById(asset);

		if (docs === null) {
			nexusError(`Could not find asset with id "${asset}"`, 400);
		}
		else {

			if (lendingBoolean === docs.status.lent) { // this is a check to see if someone is trying to relend a previously lent asset
				nexusError(`Detected an attempt to lend a lent asset "${docs.name}"`, 400);
			}

			let char = await Character.findById(target);
			if (char === null || !char) {
				char = await Character.findBy({ characterName: target });
			}
			if (char === null) {
				nexusError(`Could not find character with id "${target}"`, 400);
			}
			else {
				const index = char.lentAssets.indexOf(docs);
				lendingBoolean === true ? char.lentAssets.push(docs) : char.lentAssets.splice(index, 1);
				docs.status.lent = lendingBoolean;
				lendingBoolean === true ? docs.currentHolder = char.characterName : docs.currentHolder = null;

				char = await char.save();
				docs = await docs.save();
				logger.info(`${docs.name} Lent to ${char.characterName}.`);
				nexusEvent.emit('updateCharacters');
				res.status(200).json(docs);
			}
		}

	}
	catch (err) {
		nexusError(`${err.message}`, 500);
	}
});

module.exports = router;
