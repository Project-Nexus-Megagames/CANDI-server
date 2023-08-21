const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server
const fs = require('fs');


const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const httpErrorHandler = require('../../middleware/util/httpError'); // Middleware that parses errors and status for Express responses
const { default: axios } = require('axios');

const { Character } = require('../../models/character');

const { createAction, submitAction, deleteAction, editAction } = require('../../game/actions');
const nexusEvent = require('../../middleware/events/events'); // Local event triggers
const { Action } = require('../../models/action');

// Mongoose Model Import

router.post('/reset', async function(req, res) {
	logger.info('POST Route: api/debugRoute/reset call made..?');

	try {
		await	axios.patch('http://localhost:5000/api/actions/deleteAll');
		await	axios.patch('http://localhost:5000/api/assets/deleteAll');
		await	axios.patch('http://localhost:5000/api/characters/deleteAll');
		await	axios.patch('http://localhost:5000/api/history/deleteAll');
		await	axios.patch('http://localhost:5000/api/locations/deleteAll');
		await	axios.patch('http://localhost:5000/api/comment/deleteAll');
		await	axios.patch('http://localhost:5000/api/gamestate/deleteAll');
		await	axios.patch('http://localhost:5000/api/gameconfig/deleteAll');

		await	axios.post('http://localhost:5000/api/assets/initAssets');
		await	axios.post('http://localhost:5000/api/gamestate/initGameState');
		await	axios.post('http://localhost:5000/api/gameConfig/initGameConfig');
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

router.post('/makeAction', async function(req, res) {
	try {
		const { data, username } = req.body;
		const response = await createAction(data, username);
		res.status(200).send(response);
	}
	catch (err) {
		res.status(500).send(err);
	}
});

router.post('/submit', async function(req, res) {
	try {
		const { data, username } = req.body;
		const response = await submitAction(data, username);
		res.status(200).send(response);
	}
	catch (err) {
		res.status(500).send(err);
	}
});

router.put('/edit', async function(req, res) {
	try {
		const { data, username } = req.body;
		const response = await editAction(data, username);
		res.status(200).send(response);
	}
	catch (err) {
		res.status(500).send(err);
	}
});

router.patch('/finalize', async function(req, res) {
	try {
		const { id } = req.body;
		const action = await Action.findById(id);
		await action.finalize();
		res.status(200).send('Action finalized...');
	}
	catch (err) {
		res.status(500).send(err);
	}
});


router.patch('/restore', async function(req, res) {
	try {
		const character = await Character.findById(req.body.id);
		await character.restoreEffort();
		res.status(200).send(`${character.characterName} reset....`);
	}
	catch (err) {
		res.status(500).send(err);
	}
});

router.delete('/delete', async function(req, res) {
	try {
		await deleteAction(req.body.data, req.body.username);
		res.status(200).send('Action deleted....');
	}
	catch (err) {
		res.status(500).send(err);
	}
});

router.patch('/massRefresh', async function(req, res) {
	try {
		nexusEvent.emit('respondClient', 'refresh', [ ]);
		res.status(200).send('yeets');
	}
	catch (err) {
		res.status(500).send(err);
	}
});

router.post('/backup', async function(req, res) {
	console.log('Backup Initiated')
	try {
		const jsonData = await Action.find();
		JSON.stringify(jsonData);
		const now = new Date().toDateString();
		fs.writeFile(`./backups/backup-${now}.json`, jsonData, 'utf8', function(err) {
			if (err) {
				console.log('An error occured while writing JSON Object to File.');
				return console.log(err);
			}

		});

		res.status(200).json(jsonData);
	}
	catch (err) {
		res.status(500).send(err);
	}
});


module.exports = router;