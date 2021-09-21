const { Character } = require('../models/character');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { Action } = require('../models/action');
const { logger } = require('../middleware/log/winston');
const { Asset } = require('../models/asset');
const { Comment } = require('../models/comment');
const { History } = require('../models/history');

async function removeEffort(data) {
	let character = await Character.findOne({ characterName: data.creator });
	character = await character.expendEffort(data.effort);

	// nexusEvent.emit('updateCharacters');
	return character;
}

async function addEffort(data) {
	let character = await Character.findOne({ characterName: data.creator }).populate('assets').populate('lentAssets');
	character = await character.restoreEffort(data.effort);

	// nexusEvent.emit('updateCharacters');

	return character;
}

async function createAction(data, user) {
	// Expecting -  round, creator <<character_id>>, controllers <<Array>>, submission <<submissionSchema>>
	try {
		// Data check errors!
		if (!data.type) new Error('New actions require a type...');
		if (!data.round) new Error('New actions require a round...');
		if (!data.creator) new Error('New actions must have a character _id for creator...');
		// Add check of the submission
		if (!data.controllers) new Error('New actions must have a controllers array...');
		else if (data.controllers.length < 1) new Error('New actions must at least 1 controller assigned to it...');

		const { type, round, creator, controllers } = data;

		let action = new Action({ type, round, creator, controllers, status: ['Draft'] });

		action = await action.save();
		await action.submit(data.submission);

		const log = new History({
			docType: 'action',
			action: 'create',
			function: 'createAction',
			document: action,
			user,
			character: creator
		});

		await log.save();

		logger.info(`${action.type} "${action._id}" created.`);

		nexusEvent.emit('respondClient', 'create', [ action ]);
		return ({ message : `${action.type} Creation Success`, type: 'success' });

	}
	catch (err) {
		logger.error(`message : Server Error: ${err}`);
		return ({ message : `message : Server Error: ${err.message}`, type: 'error' });
	}
}

async function submitAction(data, user) {
	const action = await Action.findById(data.id);
	try {
		const response = await action.submit(data.submission);

		const log = new History({
			docType: 'action',
			action: 'submit',
			function: 'submitAction',
			document: action,
			user,
			character: action.creator
		});

		await log.save();
		return response;
	}
	catch (err) {
		logger.error(`message : Server Error: ${err}`);
		return ({ message : `message : Server Error: ${err.message}`, type: 'error' });
	}
}

async function editResult(data, user) {
	const { id, result, status, dieResult, mechanicalEffect } = data;
	try {
		const action = await Action.findById(id);

		action.result = result;
		action.dieResult = dieResult;
		action.mechanicalEffect = mechanicalEffect;
		if (status) {
			action.status = status;
		}

		await action.save();

		const log = new History({
			docType: 'action',
			action: 'edit',
			function: 'editResult',
			document: action,
			user
		});

		await log.save();
		nexusEvent.emit('respondClient', 'update', [ action ]);
		return ({ message : 'Action Result Edit Success', type: 'success' });
	}
	catch (err) {
		return { message : `Error: ${err}`, type: 'error' };
	}
}

async function deleteAction(data, user) {
	try {
		const id = data.id;
		let action = await Action.findById(id);
		const changed = [];

		if (action != null) {
			const log = new History({
				docType: 'action',
				action: 'delete',
				function: 'deleteAction',
				document: action,
				user
			});

			const character = await Character.findById(action.creator).populate('assets').populate('lentAssets');
			await character.restoreEffort(action.effort);
			nexusEvent.emit('respondClient', 'update', [ character ]);


			for (const item of action.assets) {
				if (!action.assets.some(el => el.toString() === item.toString())) {
					let asset = await Asset.findById(item);
					asset ? asset = await asset.unuse() : console.log('Avoided un-using a thing!');
					changed.push(asset);
				}
			}

			action = await Action.findByIdAndDelete(id);
			await log.save();

			logger.info(`Action with the id ${id} was deleted via Socket!`);
			nexusEvent.emit('respondClient', 'delete', [ { model: 'action', id } ]);
			nexusEvent.emit('respondClient', 'update', [ changed ]);
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

async function controlOverride(data, user) {
	try {
		const { id, asset } = data;
		let action = await Action.findById(id);
		if (!action) return ({ message : `No action with the id ${id} exists!`, type: 'error' });
		const item = await Asset.findById(asset);
		if (!item) return ({ message : `No asset with the id ${id} exists!`, type: 'error' });

		const i = action.assets.findIndex(el => el.toString() === asset.toString());
		if (i > -1) {
			action.assets.splice(i, 1);
			action.markModified('assets');

			action = await action.save();

			const log = new History({
				docType: 'action',
				action: 'override',
				function: 'controlOverride',
				document: action,
				user
			});

			await log.save();

			logger.info(`Asset ${asset} removed`);
			nexusEvent.emit('respondClient', 'update', [ action ]);
			return ({ message : `Asset ${asset} removed`, type: 'success' });
		}
		else {
			throw Error(`Asset ${item.name} is not attached to this action.`);
		}
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `Server Error: ${err.message}`, type: 'error' });
	}
}

async function editAction(data, user) {
	const { id } = data;
	const changed = [];
	const oldAction = await Action.findById(id);

	let action = await Action.findByIdAndUpdate(id, data, { new: true });

	const character = await Character.findOne({ characterName: action.creator }).populate('lentAssets').populate('assets');
	await character.expendEffort(action.effort - oldAction.effort);

	let comment = new Comment({
		body: `${user} edited this action...`,
		author: user,
		type: 'Info'
	});
	comment = await comment.save(); // Saves comment

	action.comments.push(comment._id);
	action.markModified('comments');

	action = await action.save();

	const log = new History({
		docType: 'action',
		action: 'edit',
		function: 'newEditAction',
		user,
		document: action
	});

	for (const item of oldAction.assets) {
		if (!action.assets.some(el => el === item.toString())) {
			let asset = await Asset.findById(item);
			asset ? asset = await asset.unuse() : console.log('Avoided un-using a thing!');
			changed.push(asset);
		}
	}

	for (const item of action.assets) {
		if (!oldAction.assets.some(el => el === item.toString())) {
			let asset = await Asset.findById(item);
			asset ? asset = await asset.use() : console.log('Avoided using a thing!');
			changed.push(asset);
		}
	}

	await log.save(); // Saves history log
	nexusEvent.emit('respondClient', 'update', [ action, ...changed, character ]);
	console.log(`${action.type} "${action.intent}" edited.`);
	return { message : `${action.type} Edit Success`, type: 'success' };
}

module.exports = { removeEffort, addEffort, createAction, submitAction, editResult, deleteAction, controlOverride, editAction };