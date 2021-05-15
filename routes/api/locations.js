const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server
const nexusEvent = require('../../middleware/events/events'); // Local event triggers

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const { locations } = require('../../config/startingData');

const validateObjectId = require('../../middleware/util/validateObjectId');
// Agent Model - Using Mongoose Model
const { Location } = require('../../models/location'); // Agent Model
const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');


// @route   GET api/locations
// @Desc    Get all locations
// @access  Public
router.get('/', async function(req, res, next) {
	logger.info('GET Route: api/locations requested: get all');
	if (req.timedout) {
		next();
	}
	else {
		try {
			const locat = await Location.find();
			res.status(200).json(locat);
		}
		catch (err) {
			logger.error(err.message, { meta: err.stack });
			res.status(500).send(err.message);
		}
	}
});

// @route   GET api/locations/:id
// @Desc    Get a single Location by ID
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
	logger.info('GET Route: api/location/:id requested...');
	const id = req.params.id;
	try {
		const location = await Location.findById(id);
		if (location != null) {
			res.status(200).json(location);
		}
		else {
			nexusError(`The location with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   POST api/locations
// @Desc    Post a new location
// @access  Public
router.post('/', async function(req, res, next) {
	logger.info('POST Route: api/location call made...');
	if (req.timedout) {
		next();
	}
	else {
		const { data } = req.body;
		try {
			let newElement = new Location(data);
			const docs = await Location.find({ intent: data.intent });

			if (docs.length < 1) {
				newElement = await newElement.save();
				const location = await Location.findById(newElement._id).populate('creator');
				logger.info(`Location "${newElement.intent}" created.`);
				res.status(200).json(location);
			}
			else {
				nexusError(`An location with intent ${newElement.intent} already exists!`, 400);
			}
		}
		catch (err) {
			httpErrorHandler(res, err);
		}
	}
});

// @route   DELETE api/locations/:id
// @Desc    Delete an location
// @access  Public
// DEPRECIATED
router.delete('/:id', async function(req, res, next) {
	logger.info('DEL Route: api/agent:id call made...');
	if (req.timedout) {
		next();
	}
	else {
		try {
			const id = req.params.id;
			let element = await Location.findById(id);
			if (element != null) {
				element = await Location.findByIdAndDelete(id);

				logger.info(`Location with the id ${id} was deleted!`);
				nexusEvent.emit('updateLocations');
				res.status(200).send(`Location with the id ${id} was deleted!`);
			}
			else {
				nexusError(`No location with the id ${id} exists!`, 400);
			}
		}
		catch (err) {
			httpErrorHandler(res, err);
		}
	}
});

// @route   PATCH api/locations/deleteAll
// @desc    Delete All locations
// @access  Public

router.patch('/deleteAll', async function(req, res) {
	let delCount = 0;
	for await (const element of Location.find()) {
		const id = element.id;
		try {
			const elementDel = await Location.findByIdAndRemove(id);
			if (elementDel == null) {
				res.status(404).send(`The Location with the ID ${id} was not found!`);
			}
			else {
				delCount += 1;
			}
		}
		catch (err) {
			nexusError(`${err.message}`, 500);
		}
	}
	nexusEvent.emit('updateLocations');
	return res.status(200).send(`We wiped out ${delCount} Locations`);
});

router.post('/initLocations', async function(req, res) {
	logger.info('POST Route: api/character call made...');

	try {
		for (const loc of locations) {
			let newLocation = new Location(loc);
			newLocation = await newLocation.save();
		}
		const locat = await Location.find();
		res.status(200).json(locat);
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

module.exports = router;
