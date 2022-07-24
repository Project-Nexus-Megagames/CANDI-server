const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');
const { Asset, GodBond, MortalBond } = require('../models/asset');
const { History } = require('../models/history');

async function modifyAsset(data, user) {
	try {
		const {	_id, name, description, uses, used, owner, status, lendable, level, dice, tags } = data;
		const asset = await Asset.findById(_id).populate('with');

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
			asset.name = name;
			asset.description = description;
			asset.uses = uses;
			asset.level = level;
			asset.dice = dice;
			asset.owner = owner;

			asset.status = status;

			asset.tags = tags;

			await asset.save();
			const log = new History({
				docType: 'asset',
				action: 'modify',
				function: 'modifyAsset',
				document: asset,
				user
			});
			await log.save();

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
		const { asset, arcane } = data;
		let newAsset;
		switch (data.asset.type) {
		case 'Asset':
			newAsset = new Asset(asset);
			newAsset.status.lendable = true;
			if (arcane) newAsset.tags.push('arcane');
			break;
		case 'Trait':
			newAsset = new Asset(asset);
			newAsset.status.lendable = false;
			if (arcane) newAsset.tags.push('arcane');
			break;
		case 'Power':
			newAsset = new Asset(asset);
			newAsset.status.lendable = false;
			break;
		case 'Territory':
			newAsset = new Asset(asset);
			newAsset.status.lendable = true;
			newAsset.uses = 999;
			break;
		case 'GodBond':
			newAsset = new GodBond(asset);
			newAsset.status.lendable = false;
			newAsset.uses = 999;
			break;
		case 'MortalBond':
			newAsset = new MortalBond(asset);
			newAsset.status.lendable = false;
			newAsset.uses = 999;
			break;
		default:
			throw Error(`Type '${data.asset.type}' is Invalid!`);
		}

		newAsset = await newAsset.save();
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
			if (lendingBoolean === asset.status.lent) {
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
			asset.status.lent = lendingBoolean;
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

async function unhideAll() {
	try {
		let assets = await Asset.find().populate('with');
		assets = assets.filter((el) => el.status.hidden === true);
		const res = [];
		for (const ass of assets) {
			console.log(ass.name);
			ass.status.hidden = false;
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

module.exports = { addAsset, modifyAsset, lendAsset, deleteAsset, unhideAll };
