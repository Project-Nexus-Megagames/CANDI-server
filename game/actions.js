const { Character } = require('../models/character');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { Action } = require('../models/action');
const { logger } = require('../middleware/log/winston');
const { Asset } = require('../models/asset');
const { History } = require('../models/history');

async function removeEffort(data) {
	const character = await Character.findOne({ characterName: data.creator });
	character.effort = character.effort - data.effort;
	await character.save();
	character.populate('assets').populate('lentAssets');
	// nexusEvent.emit('updateCharacters');
	return character;
}

async function addEffort(data) {
	const character = await Character.findOne({ characterName: data.creator }).populate('assets').populate('lentAssets');
	character.effort = character.effort + data.effort;
	if (character.effort > 3) character.effort = 3;
	await character.save();

	// nexusEvent.emit('updateCharacters');

	return character;
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

async function createAction(data, user) {
	try {
		let action = new Action(data);
		const changed = [];
		// console.log(data);
		let character = await Character.findOne({ characterName: data.creator }).populate('assets').populate('lentAssets');

		// const { asset1, asset2, asset3 } = data; // find all assets being used for new action and use them
		// const arr = [asset1, asset2, asset3];
		// for (const el of arr) {
		// 	if (el) {
		// 		let asset = await Asset.findOne({ name: el });
		// 		asset.status.used = true;
		// 		asset = await asset.save();
		// 		nexusEvent.emit('respondClient', 'update', [ asset ]);
		// 	}
		// }

		for (let i = 1; i < 4; i++) {
			if (action[`asset${i}`]) {
				let asset = await Asset.findOne({ name: action[`asset${i}`] });
				asset = await asset.use();
				changed.push(asset);
			}
		}

		if (action.type === 'Feed') {
			character.feed = true;
			character = await character.save();
		}
		else if (action.type === 'Action') {
			character.effort = character.effort - data.effort;
			character = await character.save();
		}

		action = await action.save();

		const log = new History({
			docType: 'action',
			action: 'create',
			function: 'createAction',
			document: action,
			user,
			character: character._id
		});

		await log.save();

		logger.info(`${action.type} "${action.intent}" created.`);

		nexusEvent.emit('respondClient', 'update', [ character, ...changed ]);
		nexusEvent.emit('respondClient', 'create', [ action ]);
		return ({ message : `${action.type} Creation Success`, type: 'success' });

	}
	catch (err) {
		logger.error(`message : Server Error: ${err}`);
		return ({ message : `message : Server Error: ${err.message}`, type: 'error' });
	}
}

async function createProject(data, user) {
	// TODO Scott review that this is what you want projects to do....
	// TODO how is character information passed for projects?
	let action = new Action(data);
	action.status.draft = false;
	action.status.published = true;

	action = await action.save();

	const log = new History({
		docType: 'action',
		action: 'create',
		function: 'createProject',
		document: action,
		user
	});

	await log.save();

	// nexusEvent.emit('respondClient', 'update', [ character ]);
	nexusEvent.emit('respondClient', 'create', [ action ]);
	return ({ message : `${action.type} Creation Success`, type: 'success' });
}

async function deleteAction(data, user) {
	try {
		const id = data.id;
		let element = await Action.findById(id);
		const changed = [];
		
		if (element != null) {
			const log = new History({
				docType: 'action',
				action: 'delete',
				function: 'deleteAction',
				document: element,
				user
			});

			if (element.type === 'Action') {
				const character = await addEffort(element);
				character.populate('assets').populate('lentAssets');
				nexusEvent.emit('respondClient', 'update', [ character ]);
			}
			else{
				const character = await Character.findOne({ characterName: element.creator }).populate('assets').populate('lentAssets');
				character.feed = false;
				await character.save();
				nexusEvent.emit('respondClient', 'update', [ character ]);
				log.character = character;
				log.user = character.username;
			}

			for (let i = 1; i < 4; i++) {
				if (element[`asset${i}`]) { // CASE 1: An old asset slot is getting removed
					let asset = await Asset.findOne({ name: element[`asset${i}`] });
					asset = await asset.unuse();
					changed.push(asset);
				}
			}

			// const { asset1, asset2, asset3 } = element; // find all assets being used for new action and use them
			// const arr = [asset1, asset2, asset3];
			// for (const el of arr) {
			// 	if (el) {
			// 		const asset = await Asset.findOne({ name: el });
			// 		asset.status.used = false;
			// 		await asset.save();
			// 		nexusEvent.emit('respondClient', 'update', [ asset ]);
			// 	}
			// }

			element = await Action.findByIdAndDelete(id);
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
		let element = await Action.findById(id);

		if (element != null) {
			element[asset] = '';
			element = await element.save();

			const log = new History({
				docType: 'action',
				action: 'override',
				function: 'controlOverride',
				document: element,
				user
			});

			await log.save();

			logger.info(`Asset ${asset} removed`);
			nexusEvent.emit('respondClient', 'update', [ element ]);
			return ({ message : `Asset ${asset} removed`, type: 'success' });


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

async function newEditAction(data, user) {
	const { id } = data;
	const changed = [];
	const oldAction = await Action.findById(id);
	const action = await Action.findByIdAndUpdate(id, data, { new: true });

	const log = new History({
		docType: 'action',
		action: 'edit',
		function: 'editAction',
		user,
		document: action
	});

	for (let i = 1; i < 4; i++) {
		if (oldAction[`asset${i}`] && action[`asset${i}`] !== oldAction[`asset${i}`]) { // CASE 1: An old asset slot is getting removed
			let asset = await Asset.findOne({ name: oldAction[`asset${i}`] });
			asset = await asset.unuse();
			changed.push(asset);
		}
		if (action[`asset${i}`] && action[`asset${i}`] !== oldAction[`asset${i}`]) {
			let asset = await Asset.findOne({ name: action[`asset${i}`] });
			asset = await asset.use();
			changed.push(asset);
		}
	}

	await log.save(); // Saves history log
	nexusEvent.emit('respondClient', 'update', [ action, ...changed ]);
	logger.info(`${action.type} "${action.intent}" edited.`);
	return { message : `${action.type} Edit Success`, type: 'success' };

	// let { asset1, asset2, asset3 } = action;
	// const arr = [asset1, asset2, asset3];
	// for (const el of arr) {
	// 	const asset = await Asset.findOne({ name: el });
	// 	if (asset) {
	// 		asset.unuse();
	// 		changed.push(asset);
	// 	}
	// }
}

module.exports = { removeEffort, addEffort, editResult, createAction, createProject, deleteAction, controlOverride, newEditAction };