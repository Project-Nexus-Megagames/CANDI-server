const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');
const { Action } = require('../models/action');
const { Asset } = require('../models/asset');
const { Character } = require('../models/character');
const { GameState } = require('../models/gamestate');
const { History } = require('../models/history');
const { d10, d8, d6, d4 } = require('../scripts/util/dice');

async function modifyGameState(data, user) {
	const { round, status, endTime } = data;
	let gamestate = await GameState.findOne();
	try {
		gamestate.round = round;
		gamestate.status = status;
		gamestate.endTime = endTime;
		gamestate = await gamestate.save();

		const log = new History({
			docType: 'GameState',
			action: 'modify',
			function: 'modifyGameState',
			document: gamestate,
			user
		});

		await log.save();

		nexusEvent.emit('respondClient', 'update', [gamestate]);
		return { message: 'Gamestate edit Success', type: 'success' };
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

async function closeRound() {
	const gamestate = await GameState.findOne();
	try {
		gamestate.status = 'Resolution';
		await gamestate.save();

		nexusEvent.emit('respondClient', 'update', [gamestate]);
		return { message: 'Round Closed Success', type: 'success' };
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

// eslint-disable-next-line no-unused-vars
async function calculateDie(action) {
	let dice = 0;
	let result = 0;
	let response = '';

	if (action.asset1) dice++;
	if (action.asset2) dice++;
	if (action.asset3) dice++;

	for (let i = 0; i < action.effort; i++) {
		const face = d10();
		response = response + `d10: ${face}, `;
		result = result + face;
	}

	for (let j = 0; j < dice; j++) {
		let face = 0;
		switch (j) {
		case 3:
			face = d8();
			result = result + face;
			response = response + `1d8: ${face}, `;
			break;
		case 2:
			face = d6();
			result = result + face;
			response = response + `1d6: ${face}, `;
			break;
		case 1:
			face = d4();
			result = result + face;
			response = response + `1d4: ${face}, `;
			break;
		default:
			break;
		}
	}

	response = response + `Total Result: ${result}`;
	return response;
}

async function nextRound() {
	const gamestate = await GameState.findOne();
	try {
		// Find aall hidden assets and unhide them
		// Find all used assets and -1 to their uses, then un-use them
		// Find all hidden resolutions and unhide them
		const assets = [];
		const actions = [];
		for (const asset of await Asset.find({ 'status.lent': true }).populate(
			'with'
		)) {
			asset.status.lent = false;
			asset.currentHolder = null;
			await asset.save();
			console.log(`Unlending ${asset.name}`);
			assets.push(asset);
		}

		let hidden = await Asset.find().populate('with');
		hidden = hidden.filter((el) => el.status.hidden === true);
		for (const ass of hidden) {
			console.log(`Unhiding ${ass.name}`);
			ass.status.hidden = false;
			await ass.save();
			assets.push(ass);
		}

		for (const character of await Character.find()) {
			character.lentAssets = [];
			character.effort = 2;
			character.injuries = character.injuries.filter((el) => (el.received + el.duration) > gamestate.round || el.permanent);
			character.save();
			console.log(`Restoring effort of ${character.characterName}`);
		}

		let used = await Asset.find().populate('with');
		used = used.filter((el) => el.status.used === true);
		for (const ass of used) {
			console.log(`Un-using ${ass.name}`);
			if (ass.uses !== 999) ass.uses = ass.uses - 1;
			ass.status.used = false;
			await ass.save();
			assets.push(ass);
		}

		for (const action of await Action.find({ round: gamestate.round })) {
			action.status = 'Published';

			for (const el of action.results) {
				console.log(`Making public result ${el._id}`);
				el.status = 'Public';
			}

			for (const el of action.effects) {
				if (el.status === 'Temp-Hidden') {
					console.log(`Making public effect ${el._id}`);
					el.status = 'Public';
				}
			}

			await action.save();
			await action.populateMe();
			actions.push(action);
		}

		for (const asset of await Asset.find({ 'status.used': true }).populate(
			'with'
		)) {
			asset.status.used = false;
			console.log(`Un-Using ${asset.name}`);
			await asset.save();
			assets.push(asset);
		}

		gamestate.status = 'Active';
		gamestate.round = gamestate.round + 1;
		await gamestate.save();

		nexusEvent.emit('respondClient', 'update', [
			gamestate,
			...assets,
			...actions
		]);
		return { message: 'Gamestate pushed!', type: 'success' };
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

async function easterEgg(data) {
	try {
		console.log(data);
		const { character, action } = data;
		let gamestate = await GameState.findOne();
		let char = await Character.findById(character); // find character of person doing action
		// set their timeout
		const actionTimeout = new Date();
		actionTimeout.setHours(actionTimeout.getHours() + 4);
		char.bitsy = actionTimeout;
		char.bitsyCount = char.bitsyCount + 1;
		char = await char.save();
		// Do Bitsy Action
		switch (action) {
		case 'feed':
			gamestate.hunger = gamestate.hunger + 20;
			nexusEvent.emit('respondClient', 'bitsy', { action });
			break;
		case 'play':
			gamestate.happiness = gamestate.happiness + 20;
			nexusEvent.emit('respondClient', 'bitsy', { action });
			break;
		default:
			break;
		}
		// send response event to trigger new animation
		gamestate = await gamestate.save();
		nexusEvent.emit('respondClient', 'update', [gamestate, char]);
		return { message: 'Bitsy was Fed!', type: 'success' };
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

module.exports = { modifyGameState, closeRound, nextRound, easterEgg };
