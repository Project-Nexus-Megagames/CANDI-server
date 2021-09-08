const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const httpErrorHandler = require('../../middleware/util/httpError'); // Middleware that parses errors and status for Express responses
const { default: axios } = require('axios');

// Mongoose Model Import

router.post('/reset', async function(req, res) {
	logger.info('POST Route: api/debugRoute/reset call made...');

	try {
		await	axios.patch('http://localhost:5000/api/actions/deleteAll');
		await	axios.patch('http://localhost:5000/api/assets/deleteAll');
		await	axios.patch('http://localhost:5000/api/characters/deleteAll');
		await	axios.patch('http://localhost:5000/api/history/deleteAll');
		await	axios.patch('http://localhost:5000/api/locations/deleteAll');

		await	axios.post('http://localhost:5000/api/assets/initAssets');
		await	axios.post('http://localhost:5000/api/characters/initCharacters');
		await	axios.post('http://localhost:5000/api/locations/initLocations');
		/*
		*/
		res.status(200).send('All done');
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

module.exports = router;