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
		const actions = await Action.find({ 'status': 'Draft' });
		for (const action of actions) {
			action.status = 'Awaiting';
			action.dieResult = await calculateDie(action);
			await action.save();
		}

		gamestate.status = 'Resolution';
		await gamestate.save();

		nexusEvent.emit('respondClient', 'update', actions);
		nexusEvent.emit('respondClient', 'update', [ gamestate ]);
		return ({ message : 'Round Closed Success', type: 'success' });
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `Server Error: ${err.message}`, type: 'error' });
	}
}

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

		for (const asset of await Asset.find({ 'status.hidden': true })) {
			asset.status.hidden = false;
			console.log(`Un-Hiding ${asset.name}`);
			await asset.save();
			assets.push(asset);
		}


		for (const character of await Character.find()) {
			character.lentAssets = [];
			character.feed;
			character.effort = 3;
			character.save();
		}

		for (const action of await Action.find({ 'status': 'Ready' })) {
			action.status = 'Published';
			await action.save();
			actions.push(action);
		}

		gamestate.status = 'Active';
		gamestate.round = gamestate.round + 1;
		await gamestate.save();

		nexusEvent.emit('updateCharacters'); // this actually needs to be here since all characters get updated
		nexusEvent.emit('respondClient', 'update', [ gamestate, ...assets, ...actions ]);
		return ({ message : 'Gamestate pushed!', type: 'success' });
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `Server Error: ${err.message}`, type: 'error' });
	}
}

async function easterEgg(data) {
	const gamestate = await GameState.findOne();
	const { hunger, happiness, discovered } = data;
	gamestate.discovered = discovered;
	gamestate.happiness = happiness;
	gamestate.hunger = hunger;
	await gamestate.save();
}

module.exports = { modifyGameState, closeRound, nextRound, easterEgg };