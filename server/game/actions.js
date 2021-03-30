const { Character } = require('../models/character');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { Action } = require('../models/action');
const { logger } = require('../middleware/log/winston');

async function removeEffort(data) {
	const character = await Character.findById(data.creator);
	character.effort = character.effort - data.effort;
	await character.save();
	character.populate('assets').populate('traits').populate('wealth').populate('lentAssets');
	// nexusEvent.emit('updateCharacters');
	return character;
}

async function addEffort(data) {
	const character = await Character.findById(data.creator).populate('assets').populate('traits').populate('wealth').populate('lentAssets');
	character.effort = character.effort + data.effort;
	if (character.effort > 3) character.effort = 3;
	await character.save();

	// nexusEvent.emit('updateCharacters');

	return character;
}

async function editAction(data) {
	const { id, description, intent, effort, asset1, asset2, asset3 } = data;
	const action = await Action.findById(id).populate('creator');
	if (action.model === 'Action') {
		action.description = description;
		action.intent = intent;

		const character = await Character.findById(action.creator).populate('assets').populate('traits').populate('wealth').populate('lentAssets');
		character.effort = character.effort - (effort - action.effort);
		await character.save();
		nexusEvent.emit('respondClient', 'update', [ character ]);

		action.effort = effort;

		asset1 === undefined ? action.asset1 = '' : action.asset1 = asset1;
		asset2 === undefined ? action.asset2 = '' : action.asset2 = asset2;
		asset3 === undefined ? action.asset3 = '' : action.asset3 = asset3;
	}
	else {
		const { progress, players, image } = data;
		action.status.draft = false;
		action.status.published = true;
		action.description = description;
		action.intent = intent;
		action.progress = progress;
		action.players = players;
		action.image = image;
	}


	await action.save();
	nexusEvent.emit('respondClient', 'update', [ action ]);
	return { message : 'Action Edit Success', type: 'success' };
}

async function editResult(data) {
	const { id, result, status, dieResult } = data;
	const action = await Action.findById(id).populate('creator');

	action.result = result;
	action.dieResult = dieResult;
	if (status) {
		action.status.draft = false;
		action.status.ready = false;
		action.status.published = false;
		switch (status) {
		case 'draft':
			action.status.draft = true;
			break;
		case 'ready':
			action.status.ready = true;
			break;
		case 'published':
			action.status.published = true;
			break;
		default:
			break;
		}
	}
	await action.save();
	nexusEvent.emit('respondClient', 'update', [ action ]);
	return ({ message : 'Action Result Edit Success', type: 'success' });
}

async function createAction(data) {
	try {
		let action = new Action(data);
		const docs = await Action.find({ intent: data.intent });
		if (docs.length < 1) {
			if (action.model === 'Action') {
				const character = removeEffort(data);
				character.populate('assets').populate('traits').populate('wealth').populate('lentAssets');;
				nexusEvent.emit('respondClient', 'update', [ character ]);
			}

			action = await action.save();
			action.populate('creator');

			logger.info(`Action "${action.intent}" created.`);

			nexusEvent.emit('respondClient', 'update', [ action ]);
			nexusEvent.emit('respondClient', 'create', [ action ]);
			return ({ message : 'Action Creation Success', type: 'success' });
		}
		else {
			return ({ message : 'This Action Already Exists!', type: 'error' });
		}
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `message : Server Error: ${err.message}`, type: 'error' });
	}
}

async function deleteAction(data) {
	try {
		const id = data.id;
		let element = await Action.findById(id);
		if (element != null) {

			if (element.model === 'Action') {
				const character = await addEffort(element);
				character.populate('assets').populate('traits').populate('wealth').populate('lentAssets');
				nexusEvent.emit('respondClient', 'update', [ character ]);
			}

			element = await Action.findByIdAndDelete(id);

			logger.info(`Action with the id ${id} was deleted via Socket!`);
			nexusEvent.emit('respondClient', 'delete', [ { type: 'action', id } ]);
			return ({ message : 'Action Delete Success', type: 'success' });
		}
		else {
			return ({ message : `No action with the id ${id} exists!`, type: 'error' });
		}
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `Server Error: ${err.message}`, type: 'error' });
	}
}

module.exports = { removeEffort, addEffort, editAction, editResult, createAction, deleteAction };