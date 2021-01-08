const express = require('express');
const router = express.Router();

// @route   GET /
// @Desc    Welcome
// @access  Public
router.get('/', async function(req, res) {
	console.log('Someone is visiting the server landing page!');
	res.send('Welcome to the West Coast Megagames Afterlife server, you will need to know your endpoints to get anything. Contact Scott McMann smcmann42@gmail.com for more information!');
});

module.exports = router;