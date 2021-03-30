const { Asset } = require('../models/asset');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { Character } = require('../models/character');
const { logger } = require('../middleware/log/winston');


async function modifyCharacter(data) {
	const { id, effort, email, worldAnvil, tag, standing, control, timeZone, wealth, icon, popsupport, bio, characterName, uses } = data;
	const character = await Character.findById(id).populate('wealth');

	if (character === null) {
		return ({ message : `Could not find a character for id "${id}"`, type: 'error' });
	}
	else if (character.length > 1) {
		return ({ message : `Found multiple characters for id ${id}`, type: 'error' });
	}
	else {
		let wealthAss = await Asset.findById(character.wealth._id);

		character.email = email;
		character.characterName = characterName;
		character.worldAnvil = worldAnvil;
		character.tag = tag;
		character.control = control;
		character.timeZone = timeZone;
		character.effort = effort;
		character.standingOrders = standing;

		wealthAss.description = wealth;
		wealthAss.uses = uses;

		character.icon = icon;
		character.popsupport = popsupport;
		character.bio = bio;

		wealthAss = wealthAss.save();
		await character.save();
		nexusEvent.emit('respondClient', 'update', [ character ]);
		return ({ message : `Character ${character.characterName} edited`, type: 'success' });
	}
}

async function modifySupport(data) {
	const { id, supporter } = data;
	let character = await Character.findById(id);

	if (character === null) {
		return ({ message : `Could not find a character for id "${id}"`, type: 'error' });
	}
	else if (character.length > 1) {
		return ({ message : `Found multiple characters for id ${id}`, type: 'error' });
	}
	else {
		if (character.supporters.some(el => el === supporter)) {
			const index = character.supporters.indexOf(supporter);
			character.supporters.splice(index, 1);
		}
		else {
			character.supporters.push(supporter);
		}
		character = await character.save();
		nexusEvent.emit('respondClient', 'update', [ character ]);
		return ({ message : `Character Support ${character.characterName} edited`, type: 'success' });
	}
}

async function modifyMemory(data) {
	const { id, memories } = data;
	let character = await Character.findById(id);

	if (character === null) {
		return ({ message : `Could not find a character for id "${id}"`, type: 'error' });
	}
	else if (character.length > 1) {
		return ({ message : `Found multiple characters for id ${id}`, type: 'error' });
	}
	else {
		character.memories = memories;

		character = await character.save();
		nexusEvent.emit('respondClient', 'update', [ character ]);
		return ({ message : `Character ${character.characterName} memory edited`, type: 'success' });
	}
}

async function deleteCharacter(data) {
	try {
		const id = data.id;
		let element = await Character.findById(id);
		if (element != null) {
			element = await Character.findByIdAndDelete(id);
			logger.info(`Character with the id ${id} was deleted via Socket!`);

			nexusEvent.emit('respondClient', 'delete', [ { type: 'character', id } ]);
			return ({ message : 'Character Delete Success', type: 'success' });
		}
		else {
			return ({ message : `No character with the id ${id} exists!`, type: 'error' });
		}
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `Server Error: ${err.message}`, type: 'error' });
	}
}

async function createCharacter(data) {
	try {
		let newElement = new Character(data);
		const docs = await Character.find({ characterName: data.characterName });
		if (docs.length < 1) {
			newElement = await newElement.save();
			const action = await Character.findById(newElement._id).populate('creator');

			logger.info(`Character "${newElement.characterName}" created.`);

			nexusEvent.emit('respondClient', 'create', [ action ]);
			return ({ message : 'Character Creation Success', type: 'success' });
		}
		else {
			return ({ message : 'This Character Already Exists!', type: 'error' });
		}
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `message : Server Error: ${err.message}`, type: 'error' });
	}
}

module.exports = { createCharacter, modifyCharacter, modifySupport, modifyMemory, deleteCharacter };