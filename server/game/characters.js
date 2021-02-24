const { Asset } = require('../models/asset');
const nexusEvent = require('../middleware/events/events'); // Local event triggers


async function modifyCharacter(character, data) {
	const { effort, email, worldAnvil, tag, control, timeZone, wealth, icon, popsupport, bio, characterName, uses } = data;

	let wealthAss = await Asset.findById(character.wealth._id);

	character.email = email;
	character.characterName = characterName;
	character.worldAnvil = worldAnvil;
	character.tag = tag;
	character.control = control;
	character.timeZone = timeZone;
	character.effort = effort;

	wealthAss.description = wealth;
	wealthAss.uses = uses;

	character.icon = icon;
	character.popsupport = popsupport;
	character.bio = bio;

	wealthAss = wealthAss.save();
	character = await character.save();
	nexusEvent.emit('updateCharacters');
	nexusEvent.emit('updateAssets');
	return;
}

async function modifySupport(character, supporter) {
	if (character.supporters.some(el => el === supporter)) {
		const index = character.supporters.indexOf(supporter);
		character.supporters.splice(index, 1);
	}
	else {
		character.supporters.push(supporter);
	}
	character = await character.save();
	nexusEvent.emit('updateCharacters');
	return;
}

async function modifyMemory(character, memories) {
	character.memories = memories;

	character = await character.save();
	nexusEvent.emit('updateCharacters');
	return;
}

async function newAsset(character, memories) {
	character.memories = memories;

	character = await character.save();
	nexusEvent.emit('updateCharacters');
	return;
}

module.exports = { modifyCharacter, modifySupport, modifyMemory, newAsset };