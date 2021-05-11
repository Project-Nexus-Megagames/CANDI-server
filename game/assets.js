const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');
const { Asset } = require('../models/asset');
const { Character } = require('../models/character');

async function modifyAsset(data) {
	const { id, name, description, uses } = data;
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

		await asset.save();
		nexusEvent.emit('respondClient', 'update', [ asset ]);
	}

}

async function addAsset(data) {
	try {
		const { id, asset } = data;
		let character = await Character.findById(id).populate('assets').populate('lentAssets');

		if (character === null) {
			return ({ message : `Could not find a character for id "${id}"`, type: 'error' });
		}
		else {
			let newAsset = new Asset(asset);
			switch (newAsset.type) {
			case 'Asset':
				newAsset.lendable = true;
				break;
			default:
				newAsset.uses = 999;
				break;
			}
			character.assets.push(newAsset);
			character = await character.save();
			newAsset = await newAsset.save();
			nexusEvent.emit('respondClient', 'create', [ newAsset ]);
			nexusEvent.emit('respondClient', 'update', [ character ]);
			return ({ message : `${newAsset.name} created`, type: 'success' });
		}
	}
	catch (err) {
		logger.error(err);
		return ({ message : `ERROR: ${err}`, type: 'error' });
	}
}

async function lendAsset(data) {
	const { id, target, lendingBoolean, owner } = data;
	try {
		let asset = await Asset.findById(id);

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
					asset.currentHolder = char.characteracterName;

				}
				else {
					const index = char.lentAssets.indexOf(asset);
					char.lentAssets.splice(index, 1);
				}
				asset.status.lent = lendingBoolean;
				assetOwner.assets[index2] = asset;

				char = await char.save();
				asset = await asset.save();
				assetOwner = await assetOwner.save();

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


async function deleteAsset(data) {
	try {
		const id = data.id;
		let element = await Asset.findById(id);
		if (element != null) {
			element = await Asset.findByIdAndDelete(id);
			logger.info(`Asset with the id ${id} was deleted via Socket!`);

			nexusEvent.emit('respondClient', 'delete', [ { type: 'asset', id } ]);
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