const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');
const { Asset } = require('../models/asset');
const { Character } = require('../models/character');

async function modifyAsset(data) {
	const { id, name, description, uses } = data;
	const asset = await Asset.findById(id).populate('wealth');

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
		let character = await Character.findById(id).populate('assets').populate('traits').populate('wealth').populate('lentAssets');

		if (character === null) {
			return ({ message : `Could not find a character for id "${id}"`, type: 'error' });
		}
		else {
			let newAsset = new Asset(asset);
			character.assets.push(newAsset);
			character = await character.save();
			newAsset = await newAsset.save();
			nexusEvent.emit('respondClient', 'update', [ character, newAsset ]);
			return ({ message : `${newAsset.name} created`, type: 'success' });
		}
	}
	catch (err) {
		logger.error(err);
		return ({ message : `ERROR: ${err}`, type: 'error' });
	}
}

async function lendAsset(data) {
	const { id, target, lendingBoolean } = data;
	try {
		let asset = await Asset.findById(id);

		if (asset === null) {
			return ({ message : `Could not find a asset for id "${id}"`, type: 'error' });
		}
		else {
			if (lendingBoolean === asset.status.lent) { // this is a check to see if someone is trying to relend a previously lent asset
				return ({ message : `You cannot lend an already loaned asset "${asset.name}"`, type: 'error' });
			}

			let char = await Character.findById(target).populate('assets').populate('traits').populate('wealth').populate('lentAssets');
			if (char === null || !char) {
				char = await Character.findBy({ characterName: target });
			}
			if (char === null) {
				return ({ message : `Could not find a character for id "${id}"`, type: 'error' });
			}
			else {
				const index = char.lentAssets.indexOf(asset);
				lendingBoolean === true ? char.lentAssets.push(asset) : char.lentAssets.splice(index, 1);
				asset.status.lent = lendingBoolean;
				lendingBoolean === true ? asset.currentHolder = char.characteracterName : asset.currentHolder = null;

				char = await char.save();
				asset = await asset.save();
				logger.info(`${asset.name} Lent to ${char.characterName}.`);
				nexusEvent.emit('respondClient', 'update', [ char, asset ]);
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