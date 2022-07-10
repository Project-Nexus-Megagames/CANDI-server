/* eslint-disable no-mixed-spaces-and-tabs */

const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { GameConfig } = require('../models/gameConfig');
const { logger } = require('../middleware/log/winston');
const { History } = require('../models/history');
const nexusError = require('../../middleware/util/throwError');
const _ = require('lodash');

async function createGameConfig(data, user) {

	const { actionTypes, effortTypes } = data;
	const docs = await GameConfig.find();
	if 	(docs.length >= 1) {await GameConfig.deleteMany();}

	let dupesCheck = [];
	for (const aT of actionTypes) {
		dupesCheck.push(aT.type);
		if (dupesCheck.length !== _.uniq(dupesCheck).length) {
			dupesCheck = [];
			return nexusError('ActionTypes must be unique', 400);
		}
	}
	dupesCheck = [];
	for (const eT of effortTypes) {
		dupesCheck.push(eT.type);
		console.log(dupesCheck);
		if (dupesCheck.length !== _.uniq(dupesCheck).length) {
			dupesCheck = [];
			return nexusError('EffortTypes must be unique', 400);
		}
	}

	let gameConfig = new GameConfig({
		actionTypes,
		effortTypes
	});
	gameConfig = await gameConfig.save();

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
		return { message: `Config ${gameConfig.name} Creation Success`, type: 'success' };
	 }
	 catch (err) {
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
