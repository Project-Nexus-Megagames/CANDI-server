const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server
const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const _ = require('lodash');
// Agent Model - Using Mongoose Model

const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');
const { GameConfig } = require('../../models/gameConfig');


// @route   GET api/gameConfig
// @Desc    Get gameConfig
// @access  Public
router.get('/', async function(req, res, next) {
	logger.info('GET Route: api/gameConfig requested: get all');
	if (req.timedout) {
		next();
	}
	else {
		try {
			const config = await GameConfig.findOne();
			res.status(200).json(config);
		}
		catch (err) {
			logger.error(err.message, { meta: err.stack });
			res.status(500).send(err.message);
		}
	}
});


// @route   POST api/gameConfig
// @Desc    Post a new comment
// @access  Public
router.post('/', async function(req, res, next) {
	logger.info('POST Route: api/gameConfig call made...');

	if (req.timedout) {
		next();
	}
	else {
		try {
			const docs = await GameConfig.find();
			if 	(docs.length >= 1) {await GameConfig.deleteMany();}
			let config = new GameConfig(req.body);
			let dupesCheck = [];
			for (const aT of config.actionTypes) {
				dupesCheck.push(aT.type);
				if (dupesCheck.length !== _.uniq(dupesCheck).length) {
					dupesCheck = [];
					return nexusError('ActionTypes must be unique', 400);
				}
			}
			dupesCheck = [];
			for (const eT of config.effortTypes) {
				dupesCheck.push(eT.type);
				console.log(dupesCheck);
				if (dupesCheck.length !== _.uniq(dupesCheck).length) {
					dupesCheck = [];
					return nexusError('EffortTypes must be unique', 400);
				}
			}
			config = await config.save();
			logger.info('GameConfig  created.');
			res.status(200).json(config);
		}


		catch (err) {
			httpErrorHandler(res, err);
		}
	}
});


// @route   PATCH api/comments/deleteAll
// @desc    Delete All comments
// @access  Public

router.delete('/delete', async function(req, res) {
	const data = await GameConfig.deleteMany();
	return res.status(200).send(`We wiped out ${data.deletedCount} Configurations!`);
});

module.exports = router;
