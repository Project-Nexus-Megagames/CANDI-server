const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server
const nexusEvent = require('../../middleware/events/events'); // Local event triggers

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging

// Agent Model - Using Mongoose Model
const { Action } = require('../../models/action'); // Agent Model
const { Character } = require('../../models/character');
const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');
const { removeEffort, addEffort } = require('../../game/actions');

// let oops = 0;

// @route   GET api/actions
// @Desc    Get all actions
// @access  Public
router.get('/', async function (req, res, next) {
	logger.info('GET Route: api/action requested: get all');
	if (req.timedout) {
		next();
	}
	else {
		try {
			const actions = await Action.find()
				.populate({
					path: 'comments',
					populate: { path: 'commentor', select: 'characterName profilePicture playerName' }
				}).populate('creator', 'characterName username playerName profilePicture')
				.populate({ path: 'results', populate: { path: 'resolver', select: 'characterName profilePicture playerName' } })
				.populate({ path: 'effects', populate: { path: 'effector', select: 'characterName profilePicture playerName' } })
				.populate('controller', 'characterName')
				.populate('collaborators', 'characterName creator')
				.populate({
					path: 'submissions',
					populate: { path: 'creator', select: 'characterName profilePicture playerName' }
				});
			res.status(200).json(actions);
		}


		catch (err) {
			logger.error(err.message, { meta: err.stack });
			res.status(500).send(err.message);
		}
	}
});

// @route   GET api/actions/:id
// @Desc    Get a single Action by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
	const username = req.params.id;
	logger.info(`GET Route: api/action requested: Get for character: ${username}`);
	if (req.timedout) {
		next();
	}
	else {
		try {
			// if the user is a control member send them everything
			const myCharacter = await Character.findOne({ username });
			if (!myCharacter) {
				res.status(404).send('No Character Found');
			}
			else if (myCharacter.tags.some(el => el === 'Control')) { // if the user is control
				const actions = await Action.find()
					.populate({
						path: 'comments',
						populate: { path: 'commentor', select: 'characterName profilePicture playerName' }
					}).populate('creator', 'characterName username playerName profilePicture')
					.populate({ path: 'results', populate: { path: 'resolver', select: 'characterName profilePicture playerName' } })
					.populate({ path: 'effects', populate: { path: 'effector', select: 'characterName profilePicture playerName' } })
					.populate('controller', 'characterName')
					.populate('collaborators', 'characterName creator')
					.populate({
						path: 'submissions',
						populate: { path: 'creator', select: 'characterName profilePicture playerName' }
					});
				// console.log(projects);
				res.status(200).json(actions);
			}
			else {
				const actions = await Action.find({ creator: myCharacter._id })
					.populate({
						path: 'comments',
						populate: { path: 'commentor', select: 'characterName profilePicture playerName' }
					}).populate('creator', 'characterName username playerName profilePicture')
					.populate({ path: 'results', populate: { path: 'resolver', select: 'characterName profilePicture playerName' } })
					.populate({ path: 'effects', populate: { path: 'effector', select: 'characterName profilePicture playerName' } })
					.populate('controller', 'characterName')
					.populate('collaborators', 'characterName creator')
					.populate({
						path: 'submissions',
						populate: { path: 'creator', select: 'characterName profilePicture playerName' }
					});
				// console.log(projects);
				res.status(200).json(actions);
			}

		}
		catch (err) {
			logger.error(err.message, { meta: err.stack });
			res.status(500).send(err.message);
		}
	}
});

// @route   POST api/actions
// @Desc    Post a new action
// @access  Public
router.post('/', async function (req, res, next) {
	logger.info('POST Route: api/action call made...');
	if (req.timedout) {
		next();
	}
	else {
		const { data } = req.body;
		try {
			let newElement = new Action(data);
			const docs = await Action.find({ intent: data.intent });

			if (docs.length < 1) {
				removeEffort(data);
				newElement = await newElement.save();
				const action = await Action.findById(newElement._id).populate('creator');
				logger.info(`Action "${newElement.intent}" created.`);
				res.status(200).json(action);
			}
			else {
				nexusError(`An action with intent ${newElement.intent} already exists!`, 400);
			}
		}
		catch (err) {
			httpErrorHandler(res, err);
		}
	}
});

// @route   DELETE api/actions/:id
// @Desc    Delete an action
// @access  Public
// DEPRECIATED
router.delete('/:id', async function (req, res, next) {
	logger.info('DEL Route: api/action:id call made...');
	if (req.timedout) {
		next();
	}
	else {
		try {
			const id = req.params.id;
			let element = await Action.findById(id);
			if (element != null) {
				element = await Action.findByIdAndDelete(id);

				addEffort(element);

				logger.info(`Action with the id ${id} was deleted!`);
				nexusEvent.emit('updateActions');
				res.status(200).send(`Action with the id ${id} was deleted!`);
			}
			else {
				nexusError(`No action with the id ${id} exists!`, 400);
			}
		}
		catch (err) {
			httpErrorHandler(res, err);
		}
	}
});

// @route   PATCH api/actions/deleteAll
// @desc    Delete All actions
// @access  Public

router.patch('/deleteAll', async function (req, res) {
	const data = await Action.deleteMany();
	return res.status(200).send(`We wiped out ${data.delCount} Actions`);
});


// ~~~Game Routes~~~

router.post('/project', async function (req, res, next) {
	logger.info('POST Route: api/action/project call made...');
	if (req.timedout) {
		next();
	}
	else {
		const { data } = req.body;
		try {
			let newElement = new Action(data);
			newElement.status.draft = false;
			newElement.status.published = true;

			newElement = await newElement.save();
			res.status(200).json(newElement);
			nexusEvent.emit('updateActions');
		}
		catch (err) {
			httpErrorHandler(res, err);
		}
	}
});

router.patch('/project', async function (req, res, next) {
	logger.info('patch Route: api/action/project call made...');
	if (req.timedout) {
		next();
	}
	else {
		const { description, intent, progress, players, image, id } = req.body.data;
		try {
			const project = await Action.findById(id);
			project.status.draft = false;
			project.status.published = true;
			project.description = description;
			project.intent = intent;
			project.progress = progress;
			project.players = players;
			project.image = image;
			project.save();

			nexusEvent.emit('updateActions');
			res.status(200).json(project);
		}
		catch (err) {
			httpErrorHandler(res, err);
		}
	}
});

module.exports = router;
