const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');
const { Asset } = require('../models/asset');
const { GameState } = require('../models/gamestate');
const { History } = require('../models/history');
const { ControlLog } = require('../models/log');

async function modifyAsset(receivedData, user) {
	try {
		console.log(receivedData);
		const {	data, loggedInUser } = receivedData;
	  const _id = data._id;
		const asset = await Asset.findById(_id);

		if (asset === null) {
			return {
				message: `Could not find a asset for _id "${_id}"`,
				type: 'error'
			};
		}
		else if (asset.length > 1) {
			return { message: `Found multiple assets for _id ${_id}`, type: 'error' };
		}
		else {
			for (const el in data) {
				if (data[el] !== undefined && data[el] !== '' && el !== '_id' && el !== 'model') {
					asset[el] = data[el];
				}
				else {
					console.log(`Detected invalid edit: ${el} is ${data[el]}`);
				}
			}

			await asset.save();
			const log = new History({
				docType: 'asset',
				action: 'modify',
				function: 'modifyAsset',
				document: asset,
				user
			});
			await log.save();

			const controlLog = new ControlLog({
				control: loggedInUser.username,
				affectedThing: data.name,
				controlAction: 'Asset',
				message: 'Asset: ' + data.name + ' was modified'
			});

			await controlLog.save();


			nexusEvent.emit('respondClient', 'update', [asset]);
			return { message: `${asset.name} edited`, type: 'success' };
		}
	}
	catch (err) {
		logger.error(err);
		return { message: `ERROR: ${err}`, type: 'error' };
	}
}

async function addAsset(data, user) {
	try {
		const { asset } = data;
		const gamestate = await GameState.findOne();

		let newAsset;
		newAsset = new Asset(asset);
		newAsset = await newAsset.save();

		if (gamestate.status === 'Resolution') newAsset.toggleStatus('hidden', true);
		// switch (data.asset.type) {
		// case 'Asset':
		// 	newAsset.status.lendable = true;
		// 	break;
		// case 'Trait':
		// 	newAsset.status.lendable = false;
		// 	break;
		// case 'Power':
		// 	newAsset.status.lendable = false;
		// 	break;
		// case 'Territory':
		// 	newAsset.status.lendable = true;
		// 	newAsset.uses = 999;
		// 	break;
		// case 'Title':
		// 	newAsset.status.lendable = false;
		// 	break;
		// default:
		// 	throw Error(`Type '${data.asset.type}' is Invalid!`);
		// }


		const controlLog = new ControlLog({
			control: data.loggedInUser.username,
			affectedThing: asset.name,
			affectedCharacter: asset.owner !== undefined ? asset.owner : asset.ownerCharacter,
			controlAction: 'Asset',
			message: 'Asset: ' + asset.name + ' was created for ' + asset.owner
		});

		await controlLog.save();

		nexusEvent.emit('respondClient', 'create', [newAsset]);
		// nexusEvent.emit('respondClient', 'update', [ character ]);

		await newAsset.save();

		const log = new History({
			docType: 'asset',
			action: 'add',
			function: 'addAsset',
			document: newAsset,
			user
		});

		await log.save();

		return {
			message: `${newAsset.type} ${newAsset.name} created`,
			type: 'success'
		};
	}
	catch (err) {
		logger.error(err);
		return { message: `ERROR: ${err}`, type: 'error' };
	}
}

async function lendAsset(data, user) {
	const { id, target, lendingBoolean } = data;
	try {
		let asset = await Asset.findById(id);

		const log = new History({
			docType: 'asset',
			action: 'lend',
			function: 'lendAsset',
			user
		});

		if (asset === null) {
			return {
				message: `Could not find a asset for id "${id}"`,
				type: 'error'
			};
		}
		else {
			if (asset.status.some(el => el === 'lent')) {
				// this is a check to see if someone is trying to relend a previously lent asset
				return {
					message: `You cannot lend an already loaned asset "${asset.name}"`,
					type: 'error'
				};
			}

			if (lendingBoolean) {
				// if the asset is being lent
				asset.currentHolder = target;
			}
			else {
				asset.currentHolder = asset.owner;
			}
			asset.toggleStatus('lent', lendingBoolean);
			asset = await asset.save();

			log.document = asset;

			await log.save();

			logger.info(`${asset.name} Lent to ${target}.`);
			nexusEvent.emit('respondClient', 'update', [asset]);
			return { message: `${asset.name} lent to ${target}`, type: 'success' };
		}
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

async function deleteAsset(data, user) {
	try {
		const id = data.id;
		let element = await Asset.findById(id);
		if (element != null) {
			const log = new History({
				docType: 'asset',
				action: 'delete',
				function: 'deleteAsset',
				document: element,
				user
			});
			element = await Asset.findByIdAndDelete(id);
			logger.info(`Asset with the id ${id} was deleted via Socket!`);

			await log.save();

			nexusEvent.emit('respondClient', 'delete', [{ model: 'asset', id }]);
			return { message: 'Asset Delete Success', type: 'success' };
		}
		else {
			return { message: `No asset with the id ${id} exists!`, type: 'error' };
		}
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

async function unhideAllAssets() {
	try {
		const assets = await Asset.find({ status: 'hidden' }).populate('with');
		const res = [];
		for (const ass of assets) {
			console.log('unhiding: ', ass.name);
			if (ass.uses !== 999) ass.uses = ass.uses - 1;

			await ass.save();
			res.push(ass);
		}
		nexusEvent.emit('respondClient', 'update', res);
	}
	catch (err) {
		logger.error(err);
		return { message: `ERROR: ${err}`, type: 'error' };
	}
}

async function unLendAllAssets() {
	try {
		const res = [];
		for (const asset of await Asset.find({ status: 'lent' }).populate(
			'with'
		)) {

			asset.toggleStatus('lent', true);

			asset.currentHolder = null;
			await asset.save();
			console.log(`Unlending ${asset.name}`);
			res.push(asset);
		}
		nexusEvent.emit('respondClient', 'update', res);
	}
	catch (err) {
		logger.error(err);
		return { message: `ERROR: ${err}`, type: 'error' };
	}
}

module.exports = { addAsset, modifyAsset, lendAsset, deleteAsset, unhideAllAssets, unLendAllAssets };
