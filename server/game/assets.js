const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');

async function modifyAsset(asset, data) {
	const { name, description, uses } = data;
	asset.name = name;
	asset.description = description;
	asset.uses = uses;

	asset = await asset.save();
	nexusEvent.emit('updateCharacters');
	nexusEvent.emit('updateAssets');
}

async function addAsset(asset, character) {
	asset.model === 'Asset' ? character.assets.push(asset) : character.traits.push(asset);
	character = await character.save();
	asset = await asset.save();
	nexusEvent.emit('updateCharacters');
	nexusEvent.emit('updateAssets');
}

async function lendAsset(asset, character, lendingBoolean) {
	const index = character.lentAssets.indexOf(asset);
	lendingBoolean === true ? character.lentAssets.push(asset) : character.lentAssets.splice(index, 1);
	asset.status.lent = lendingBoolean;
	lendingBoolean === true ? asset.currentHolder = character.characteracterName : asset.currentHolder = null;

	character = await character.save();
	asset = await asset.save();
	logger.info(`${asset.name} Lent to ${character.characterName}.`);
	nexusEvent.emit('updateCharacters');
}

module.exports = { addAsset, modifyAsset, lendAsset };