const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');
const { Action } = require('../models/action');
const { Asset } = require('../models/asset');
const { Character } = require('../models/character');
const { GameState } = require('../models/gamestate');


async function modifyGameState(data) {
	const { round, status, endTime } = data;
	let gamestate = await GameState.findOne();
	try {
		gamestate.round = round;
		gamestate.status = status;
		gamestate.endTime = endTime;
		gamestate = await gamestate.save();

		nexusEvent.emit('respondClient', 'update', [ gamestate ]);
		return ({ message : 'Gamestate edit Success', type: 'success' });
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `Server Error: ${err.message}`, type: 'error' });
	}
}

async function closeRound() {
	const gamestate = await GameState.findOne();
	try {
		const actions = await Action.find({ 'status.draft': true });
		for (const action of actions) {
			action.status.draft = false;
			await action.save();
		}

		gamestate.status = 'Resolution';
		await gamestate.save();

		nexusEvent.emit('respondClient', 'update', [ gamestate, actions ]);
		return ({ message : 'Round Closed Success', type: 'success' });
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `Server Error: ${err.message}`, type: 'error' });
	}
}

async function nextRound() {
	const gamestate = await GameState.findOne();
	try {
		const assets = [];
		const actions = [];
		for (const asset of await Asset.find({ 'status.lent': true })) {
			asset.status.lent = false;
			asset.currentHolder = null;
			console.log(`Unlending ${asset.name}`);
			await asset.save();
			assets.push(asset);
		}

		for (const asset of await Asset.find({ 'status.used': true })) {
			asset.status.used = false;
			console.log(`Un-Using ${asset.name}`);
			await asset.save();
			assets.push(asset);
		}


		for (const character of await Character.find()) {
			character.lentAssets = [];
			character.effort = 3;
			character.save();
		}

		for (const action of await Action.find({ 'status.ready': true })) {
			action.status.ready = false;
			action.status.published = true;
			await action.save();
			actions.push(action);
		}

		gamestate.status = 'Active';
		gamestate.round = gamestate.round + 1;
		await gamestate.save();

		nexusEvent.emit('updateCharacters'); // this actually needs to be here since all characters get updated
		nexusEvent.emit('respondClient', 'update', [ gamestate, assets, actions ]);
		return ({ message : 'Gamestate pushed!', type: 'success' });
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `Server Error: ${err.message}`, type: 'error' });
	}
}

module.exports = { modifyGameState, closeRound, nextRound };