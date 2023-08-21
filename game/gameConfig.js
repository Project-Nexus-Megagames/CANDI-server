/* eslint-disable no-mixed-spaces-and-tabs */

const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { GameConfig } = require('../models/gameConfig');
const { logger } = require('../middleware/log/winston');
const { History } = require('../models/history');
const nexusError = require('../middleware/util/throwError');
const _ = require('lodash');
const { Character } = require('../models/character');
const { GameState } = require('../models/gamestate');

async function createGameConfig(data, user) {
	const {
		actionTypes,
		effortTypes,
		globalStats,
		characterStats,
		resourceTypes
	} = data;
	const docs = await GameConfig.find();
	const gamestate = await GameState.findOne();

	if (gamestate.round > 1) {
		throw Error(
			'Editing Gamestate After Round 1 is Disabled for... uh.. reasons. Talk to Scott'
		);
	}
	if (docs.length >= 1) {
		await GameConfig.deleteMany();
	}

	let dupesCheck = [];
	for (const aT of actionTypes) {
		dupesCheck.push(aT.type);
		if (dupesCheck.length !== _.uniq(dupesCheck).length) {
			dupesCheck = [];
			return nexusError('ActionTypes must be unique', 400);
		}
	}

  // Scott has disabled this to allow for allowing multiple tags for 1 effort type
	// dupesCheck = [];
	// for (const eT of effortTypes) {
	// 	dupesCheck.push(eT.type);
	// 	if (dupesCheck.length !== _.uniq(dupesCheck).length) {
	// 		dupesCheck = [];
	// 		return nexusError('EffortTypes must be unique', 400);
	// 	}
	// }

	dupesCheck = [];
	for (const rT of resourceTypes) {
		dupesCheck.push(rT.type);
		if (dupesCheck.length !== _.uniq(dupesCheck).length) {
			dupesCheck = [];
			return nexusError('ResourceTypes must be unique', 400);
		}
	}

	let gameConfig = new GameConfig({
		actionTypes,
		effortTypes,
		characterStats,
		globalStats,
		resourceTypes
	});
	console.log('HELLO', actionTypes);
	gameConfig = await gameConfig.save();

	for (const char of await Character.find()) {
		char.characterStats = characterStats;
		await char.save();
	}

	gamestate.globalStats = globalStats;
	await gamestate.save();

	const log = new History({
		docType: 'gameConfig',
		action: 'create',
		function: 'createGameConfig',
		document: gameConfig,
		user
	});

	await log.save();

	logger.info(`Game Config ${gameConfig.name} created.`);
	try {
		nexusEvent.emit('respondClient', 'create', [gameConfig]);
		return {
			message: `Config ${gameConfig.name} Creation Success`,
			type: 'success'
		};
	} catch (err) {
		console.log(err);
		logger.error(`message : Server Error: ${err}`);
		return {
			message: `message : Server Error: ${err.message}`,
			type: 'error'
		};
	}
}

module.exports = {
	createGameConfig
};
