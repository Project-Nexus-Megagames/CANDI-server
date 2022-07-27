const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging

// Agent Model - Using Mongoose Model
const { Log } = require('../../models/log'); // Agent Model


// @route   GET api/log
// @Desc    Get all log messages
// @access  Public
router.get('/', async function(req, res, next) {
	logger.info('GET Route: api/log requested...');
	if (req.timedout) {
		next();
	}
	else {
		try {
			const char = await Log.find();
			res.status(200).json(char);
		}
		catch (err) {
			logger.error(err.message, { meta: err.stack });
			res.status(500).send(err.message);
		}
	}
});

module.exports = router;