const { Character } = require('../models/character');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { Action } = require('../models/action');

async function removeEffort(data) {
	const character = await Character.findById(data.creator);
	character.effort = character.effort - data.effort;
	await character.save();
	character.populate('assets').populate('traits').populate('wealth').populate('lentAssets');
	// nexusEvent.emit('updateCharacters');
	return character;
}

async function addEffort(data) {
	const character = await Character.findById(data.creator);
	character.effort = character.effort + data.effort;
	if (character.effort > 3) character.effort = 3;
	await character.save();
	character.populate('assets').populate('traits').populate('wealth').populate('lentAssets');

	// nexusEvent.emit('updateCharacters');

	return character;
}

async function editAction(data) {
	const { id, description, intent, effort, asset1, asset2, asset3 } = data;
	const action = await Action.findById(id).populate('creator');
	action.description = description;
	action.intent = intent;

	const character = await Character.findById(action.creator);
	character.effort = character.effort - (effort - action.effort);
	character.save();

	action.effort = effort;

	asset1 === undefined ? action.asset1 = '' : action.asset1 = asset1;
	asset2 === undefined ? action.asset2 = '' : action.asset2 = asset2;
	asset3 === undefined ? action.asset3 = '' : action.asset3 = asset3;

	await action.save();
	nexusEvent.emit('updateCharacters');
	// nexusEvent.emit('updateActions');
	return action;
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
	// nexusEvent.emit('updateActions');
	return action;
}

module.exports = { removeEffort, addEffort, editAction, editResult };