const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');
const { Asset, GodBond } = require('../models/asset');
const { Character } = require('../models/character');
const { History } = require('../models/history');

async function modifyAsset(data, user) {
	try {
		const { id, name, description, uses, used, owner, hidden, lendable, level } = data;
		const asset = await Asset.findById(id);

		if (asset === null) {
			return ({ message : `Could not find a asset for id "${id}"`, type: 'error' });
		}
		else if (asset.length > 1) {
			return ({ message : `Found multiple assets for id ${id}`, type: 'error' });
		}
		else {
			asset.name = name;
			asset.description = description;
			asset.uses = uses;
			asset.level = level;
			asset.owner = owner;
			asset.status.used = used;
			asset.status.hidden = hidden;
			asset.status.lendable = lendable;

			await asset.save();
			const log = new History({
				docType: 'asset',
				action: 'modify',
				function: 'modifyAsset',
				document: asset,
				user
			});
			await log.save();

			nexusEvent.emit('respondClient', 'update', [ asset ]);
			return ({ message : `${asset.name} edited`, type: 'success' });
		}
	}
	catch (err) {
		logger.error(err);
		return ({ message : `ERROR: ${err}`, type: 'error' });
	}

}

async function addAsset(data, user) {
	try {
		const { id, asset } = data;
		let character = await Character.findById(id).populate('assets').populate('lentAssets');

		if (character === null) {
			return ({ message : `Could not find a character for id "${id}"`, type: 'error' });
		}
		else {
			let newAsset;
			switch (data.asset.type) {
			case 'Asset':
				newAsset = new Asset(asset);
				newAsset.status.lendable = true;
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
			default:
				throw Error(`Type '${data.type}' is Invalid!`);
			}

			newAsset = await newAsset.save();
			nexusEvent.emit('respondClient', 'create', [ newAsset ]);
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

			return ({ message : `${newAsset.type} ${newAsset.name} created`, type: 'success' });
		}
	}
	catch (err) {
		logger.error(err);
		return ({ message : `ERROR: ${err}`, type: 'error' });
	}
}

async function lendAsset(data, user) {
	const { id, target, lendingBoolean, owner } = data;
	try {
		let asset = await Asset.findById(id);

		const log = new History({
			docType: 'asset',
			action: 'lend',
			function: 'lendAsset',
			user
		});

		if (asset === null) {
			return ({ message : `Could not find a asset for id "${id}"`, type: 'error' });
		}
		else {
			if (lendingBoolean === asset.status.lent) { // this is a check to see if someone is trying to relend a previously lent asset
				return ({ message : `You cannot lend an already loaned asset "${asset.name}"`, type: 'error' });
			}

			let char = await Character.findById(target).populate('assets').populate('lentAssets');
			let assetOwner = await Character.findById(owner).populate('assets').populate('lentAssets');
			if (char === null || !char) {
				char = await Character.findBy({ characterName: target });
			}
			if (char === null) {
				return ({ message : `Could not find a character for id "${target}"`, type: 'error' });
			}
			else {
				const index2 = assetOwner.assets.findIndex(el => el._id.toHexString() === id);

				if (lendingBoolean) { // if the asset is being lent
					char.lentAssets.push(asset);
					asset.currentHolder = char.characterName;
				}
				else {
					const index = char.lentAssets.indexOf(asset);
					char.lentAssets.splice(index, 1);
					asset.currentHolder = asset.owner;
				}
				asset.status.lent = lendingBoolean;
				assetOwner.assets[index2] = asset;

				char = await char.save();
				asset = await asset.save();
				assetOwner = await assetOwner.save();

				log.document = asset;

				await log.save();

				logger.info(`${asset.name} Lent to ${char.characterName}.`);
				nexusEvent.emit('respondClient', 'update', [ char, asset, assetOwner ]);
				return ({ message : `${asset.name} lent to ${char.characterName}`, type: 'success' });
			}
		}
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `Server Error: ${err.message}`, type: 'error' });
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

			nexusEvent.emit('respondClient', 'delete', [ { model: 'asset', id } ]);
			return ({ message : 'Asset Delete Success', type: 'success' });
		}
		else {
			return ({ message : `No asset with the id ${id} exists!`, type: 'error' });
		}
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `Server Error: ${err.message}`, type: 'error' });
	}
}

module.exports = { addAsset, modifyAsset, lendAsset, deleteAsset };