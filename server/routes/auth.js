const bcrypt = require('bcryptjs');
const express = require('express');
const { logger } = require('../middleware/log/winston');
const router = express.Router();

const { User } = require('../models/user');

// @route   POST /user
// @Desc    Post a new User
// @access  Public
router.post('/', async function(req, res) {
	const { password, user: login } = req.body;
	console.log(`${login} is attempting to log in...`);

	let user = await User.findOne({ email: login });
	if (!user) user = await User.findOne({ username: login });
	if (!user) {
		logger.info(`User ${login} doesn't exist in DB...`);
		return res.status(400).send('Invalid login or password');
	}

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		logger.info(`${login} used an invalid password...`);
		return res.status(400).send('Invalid login or password');
	}

	const token = user.generateAuthToken();
	res.status(200).send(token);
});

module.exports = router;