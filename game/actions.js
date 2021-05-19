const { Character } = require('../models/character');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { Action, FeedAction } = require('../models/action');
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

async function editAction(data) {
	console.log(data);
	try {
		const { id, description, intent, effort, asset1, asset2, asset3 } = data;
		const changed = [];
		const action = await Action.findById(id);

		const log = new History({
			timestamp: new Date(),
			docType: 'action',
			action: 'edit',
			function: 'editAction'
		});

		if (action.type === 'Action' || action.type === 'Feed') {
			action.description = description;
			action.intent = intent;

			if (action.type === 'Action') {
				const character = await Character.findOne({ characterName: action.creator }).populate('assets').populate('lentAssets');
				character.effort = character.effort - (effort - action.effort);
				await character.save();

				log.character = character._id;
				log.user = character.username;
				nexusEvent.emit('respondClient', 'update', [ character ]);
			}
			action.effort = effort;

			// asset1 === undefined ? action.asset1 = '' : action.asset1 = asset1;
			if (asset1 === undefined || !asset1) { // if we are overwriting with null
				if (action.asset1) {
					const oldAsset = await Asset.findOne({ name: action.asset1 });
					oldAsset.status.used = false;
					await oldAsset.save();
					changed.push(oldAsset);
				}
				action.asset1 = null;
			}
			else if (asset1 === action.asset1) { // if nothing is being changed
				console.log('hi');
			}
			else if (asset1 && action.asset1) {
				const oldAsset = await Asset.findOne({ name: action.asset1 });
				oldAsset.status.used = false;
				await oldAsset.save();

				const newAsset = await Asset.findOne({ name: asset1 });
				newAsset.status.used = true;
				await newAsset.save();

				changed.push(oldAsset);
				changed.push(newAsset);
			}
			else { // if a new asset is being added to a slot
				const newAsset = await Asset.findOne({ name: asset1 });
				newAsset.status.used = true;
				await newAsset.save();
				action.asset1 = asset1;
				changed.push(newAsset);
			}

			// asset2 === undefined ? action.asset2 = '' : action.asset2 = asset2;
			if (asset2 === undefined || !asset2) { // if we are overwriting with null
				if (action.asset2) {
					const oldAsset = await Asset.findOne({ name: action.asset2 });
					oldAsset.status.used = false;
					await oldAsset.save();
					changed.push(oldAsset);
				}
				action.asset2 = null;
			}
			else if (asset2 === action.asset2) { // if nothing is being changed
				console.log('hi');
			}
			else if (asset2 && action.asset2) {
				const oldAsset = await Asset.findOne({ name: action.asset2 });
				oldAsset.status.used = false;
				await oldAsset.save();

				const newAsset = await Asset.findOne({ name: asset2 });
				newAsset.status.used = true;
				await newAsset.save();

				changed.push(oldAsset);
				changed.push(newAsset);
			}
			else { // if a new asset is being added to a slot
				const newAsset = await Asset.findOne({ name: asset2 });
				newAsset.status.used = true;
				await newAsset.save();
				action.asset2 = asset2;
				changed.push(newAsset);
			}

			// asset1 === undefined ? action.asset1 = '' : action.asset1 = asset1;
			if (asset3 === undefined || !asset3) { // if we are overwriting with null
				if (action.asset3) {
					const oldAsset = await Asset.findOne({ name: action.asset3 });
					oldAsset.status.used = false;
					await oldAsset.save();
					changed.push(oldAsset);
				}
				action.asset3 = null;
			}
			else if (asset3 === action.asset3) { // if nothing is being changed
				console.log('hi');
			}
			else if (asset3 && action.asset3) {
				const oldAsset = await Asset.findOne({ name: action.asset3 });
				oldAsset.status.used = false;
				await oldAsset.save();

				const newAsset = await Asset.findOne({ name: asset3 });
				newAsset.status.used = true;
				await newAsset.save();

				changed.push(oldAsset);
				changed.push(newAsset);
			}
			else { // if a new asset is being added to a slot
				const newAsset = await Asset.findOne({ name: asset3 });
				newAsset.status.used = true;
				await newAsset.save();
				action.asset3 = asset3;
				changed.push(newAsset);
			}
			asset3 === undefined ? action.asset3 = '' : action.asset3 = asset3;
		}
		else {
			const { progress, players, image, status } = data;
			action.status = status;
			action.description = description;
			action.intent = intent;
			action.progress = progress;
			action.players = players;
			action.image = image;
		}
		// console.log(changed);

		await action.save();
		log.document = action;
		await log.save(); // Saves history log
		nexusEvent.emit('respondClient', 'update', [ action, ...changed ]);
		logger.info(`${action.type} "${action.intent}" edited.`);
		return { message : `${action.type} Edit Success`, type: 'success' };
	}
	catch (err) {
		return { message : err, type: 'error' };
	}

}

async function editResult(data) {
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
		nexusEvent.emit('respondClient', 'update', [ action ]);
		return ({ message : 'Action Result Edit Success', type: 'success' });
	}
	catch (err) {
		return { message : `Error: ${err}`, type: 'error' };
	}

}

async function createAction(data) {
	try {
		let action = new Action(data);
		// console.log(data);
		const docs = await Action.find({ intent: data.intent });
		if (docs.length < 1) {
			const character = await Character.findOne({ characterName: data.creator }).populate('assets').populate('lentAssets');
			if (action.type === 'Feed') {
				character.feed = true;
				await character.save();
			}
			else if (action.type === 'Action') {
				character.effort = character.effort - data.effort;
				await character.save();
			}

			const { asset1, asset2, asset3 } = data; // find all assets being used for new action and use them
			const arr = [asset1, asset2, asset3];
			for (const el of arr) {
				if (el) {
					const asset = await Asset.findOne({ name: el });
					asset.status.used = true;
					await asset.save();
				}
			}

			action = await action.save();

			const log = new History({
				timestamp: new Date(),
				docType: 'action',
				action: 'create',
				function: 'createAction',
				document: action,
				user: character.username,
				character: character._id
			});

			await log.save();

			logger.info(`${action.type} "${action.intent}" created.`);

			nexusEvent.emit('respondClient', 'update', [ character ]);
			nexusEvent.emit('respondClient', 'create', [ action ]);
			return ({ message : `${action.type} Creation Success`, type: 'success' });
		}
		else {
			return ({ message : `This ${action.type} Already Exists!`, type: 'error' });
		}
	}
	catch (err) {
		logger.error(`message : Server Error: ${err}`);
		return ({ message : `message : Server Error: ${err.message}`, type: 'error' });
	}
}

async function createProject(data) {
	// TODO Scott review that this is what you want projects to do....
	// TODO how is character information passed for projects?
	let action = new Action(data);
	action.status.draft = false;
	action.status.published = true;

	action = await action.save();

	const log = new History({
		timestamp: new Date(),
		docType: 'action',
		action: 'create',
		function: 'createProject',
		document: action
	});

	await log.save();

	// nexusEvent.emit('respondClient', 'update', [ character ]);
	nexusEvent.emit('respondClient', 'create', [ action ]);
	return ({ message : `${action.type} Creation Success`, type: 'success' });
}

async function deleteAction(data) {
	try {
		const id = data.id;
		let element = await Action.findById(id);

		if (element != null) {

			const log = new History({
				timestamp: new Date(),
				docType: 'action',
				action: 'delete',
				function: 'deleteAction',
				document: element
			});

			if (element.type === 'Action') {
				const character = await addEffort(element);
				character.populate('assets').populate('lentAssets');
				nexusEvent.emit('respondClient', 'update', [ character ]);
				log.character = character;
				log.user = character.username;
			}
			else{
				const character = await Character.findOne({ characterName: element.creator }).populate('assets').populate('lentAssets');
				character.feed = false;
				await character.save();
				nexusEvent.emit('respondClient', 'update', [ character ]);
				log.character = character;
				log.user = character.username;
			}

			const { asset1, asset2, asset3 } = element; // find all assets being used for new action and use them
			const arr = [asset1, asset2, asset3];
			for (const el of arr) {
				if (el) {
					const asset = await Asset.findOne({ name: el });
					asset.status.used = false;
					await asset.save();
				}
			}

			element = await Action.findByIdAndDelete(id);
			await log.save();

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

module.exports = { removeEffort, addEffort, editAction, editResult, createAction, createProject, deleteAction };