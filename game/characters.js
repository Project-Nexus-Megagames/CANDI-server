const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { Character } = require('../models/character');
const { logger } = require('../middleware/log/winston');
const { default: axios } = require('axios');


async function modifyCharacter(data) {
	const { id, effort, email, worldAnvil, tag, standing, control, timeZone, popsupport, bio, characterName, color, characterActualName, controlEmail, pronouns } = data;
	const character = await Character.findById(id).populate('assets').populate('lent');

	try {
		if (character === null) {
			return ({ message : `Could not find a character for id "${id}"`, type: 'error' });
		}
		else if (character.length > 1) {
			return ({ message : `Found multiple characters for id ${id}`, type: 'error' });
		}
		else {
			for (const el in data) {
				if (data[el] && data[el] !== '') {
					character[el] = data[el];
				}
				else {
					console.log(`Detected invalid edit: ${el} is ${data[el]}`);
				}
			}
			/*
			character.email = email;
			character.characterName = characterName;
			character.worldAnvil = worldAnvil;
			character.tag = tag;
			character.control = control;
			character.timeZone = timeZone;
			character.effort = effort;
			character.standingOrders = standing;

			character.popsupport = popsupport;
			character.bio = bio;

			character.color = color;
			character.characterActualName = characterActualName;
			if (controlEmail && controlEmail !== '') character.controlEmail = controlEmail;
			character.pronouns = pronouns;
			*/


			await character.save();
			character.populate('assets').populate('lentAssets');
			nexusEvent.emit('respondClient', 'update', [ character ]);
			return ({ message : `Character ${character.characterName} edited`, type: 'success' });
		}
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `message : Server Error: ${err.message}`, type: 'error' });
	}
}


async function modifySupport(data) {
	const { id, supporter } = data;
	let character = await Character.findById(id).populate('assets').populate('lentAssets');

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

async function register(data) {
	const { character, username, playerName, email } = data;
	try {
		let regChar = await Character.findById(character).populate('assets').populate('lentAssets');

		if (regChar === null) {
			return ({ message : `Could not find a character for id "${character}"`, type: 'error' });
		}
		else {
			regChar.username = username;
			regChar.playerName = playerName;
			regChar = await regChar.save();
			nexusEvent.emit('respondClient', 'update', [ regChar ]);
			const emailStuff = {
				from: 'Dusk City Registration',
				to: email,
				subject: 'Dusk City Registration',
				html: `<p>Dear ${regChar.playerName},</p> <p> You have been successfully registered for the Dusk City CANDI App, and can now log in. Make sure you log in with either the email or username you used to register on the Nexus Portal.</p> <p>Have fun!</p> <p>Your Character: ${regChar.characterName} </p> https://candi-app.herokuapp.com/home`
			};
			await	axios.post('https://nexus-central-server.herokuapp.com/nexus/email', emailStuff);
		}

		return ({ message : `Player ${username} registered to ${regChar.characterName}`, type: 'success' });

	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `message : Server Error: ${err.message}`, type: 'error' });
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
		let element = await Character.findById(id).populate('assets').populate('lentAssets');
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
			const charavter = await Character.findById(newElement._id).populate('assets').populate('lentAssets');

			logger.info(`Character "${newElement.characterName}" created.`);

			nexusEvent.emit('respondClient', 'create', [ charavter ]);
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

module.exports = { createCharacter, modifyCharacter, modifySupport, modifyMemory, deleteCharacter, register };