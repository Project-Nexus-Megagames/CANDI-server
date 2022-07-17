const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { Character } = require('../models/character');
const { logger } = require('../middleware/log/winston');
const { default: axios } = require('axios');


async function modifyCharacter(data) {
	const { _id } = data;
	let character = await Character.findById(_id);

	try {
		if (character === null) {
			return ({ message : `Could not find a character for _id "${_id}"`, type: 'error' });
		}
		else if (character.length > 1) {
			return ({ message : `Found multiple characters for _id ${_id}`, type: 'error' });
		}
		else {
			for (const el in data) {
				if (data[el] !== undefined && data[el] !== '' && el !== '_id' && el !== 'model') {
					character[el] = data[el];
				}
				else {
					console.log(`Detected invalid edit: ${el} is ${data[el]}`);
				}
			}

			await character.save();
			character = await character.populateMe();
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
				from: 'CANDI Registration',
				to: email,
				subject: 'CANDI Registration',
				html: `<p>Dear ${regChar.playerName},</p> <p> You have been successfully registered on the CANDI App, and can now log in. Make sure you log in with either the email or username you used to register on the Nexus Portal.</p> <p>Have fun!</p> <p>Your Character: ${regChar.characterName} </p> https://candi-app.herokuapp.com/home`
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

async function pirate(data) {
	const { character, username, playerName, email } = data;
	try {
		const emailStuff = {
			from: 'The Ghost of Black Bob',
			to: email,
			subject: 'A message from Black Bob',
			html: `<p>Dear ${character}, 
			<p>In the Omega Seas</p>
			<p>A sleepless watcher guards my treasure</p>
			<p>Speak the secret phrase</p>
			<p>and the path to me cove will be revealed</p>
			
			<b>Secret Phrase:</b>
			 
			<h5>The [T:47] [PWDDA1:39] sails on the [POTS1:05] [TMR6:33] </h5>

			<p style="color:#FFFFFF">The key lays behind the waving flag</p>	`
		};
		await	axios.post('https://nexus-central-server.herokuapp.com/nexus/email', emailStuff);

		return ({ message : `A MESSAGE FROM BEYOND HAS BEEN SENT...`, type: 'success' });

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

			nexusEvent.emit('respondClient', 'delete', [ { model: 'character', id } ]);
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

async function manageContacts(data) {
	const { charId, contacts } = data;

	if (contacts.some(el => el === null)) return ({ message : `ERROR: NULL contact`, type: 'success' });

	let character = await Character.findById(charId);
	character.knownContacts = contacts;
	await character.save();
	character = await character.populateMe();
	nexusEvent.emit('respondClient', 'update', [character]);
	logger.info(`${character.characterName} edited.`);
	return { message: 'Character Edit Success', type: 'success' };
}

async function healInjury(data) {
	const { char, injuriesToHeal } = data;
	let character = await Character.findById(char);
	injuriesToHeal.forEach((injId) => {
		const found = character.injuries.findIndex((injury) => injury._id.toString() === injId);
		if (found === -1) 	{
			console.log('blah');
			return {
				message: 'Character does not have that injury to heal.',
				type: 'error'
			};

		}
		else {character.injuries = character.injuries.filter((injury) => injId !== injury._id.toString());}
	});
	await character.save();
	character = await character.populateMe();
	nexusEvent.emit('respondClient', 'update', [character]);
	logger.info(`${character.characterName} edited.`);
	return { message: 'Character Edit Success', type: 'success' };
}

async function shareContacts(data) {
	const { chars, charId } = data;
	console.log(data);
	let character = await Character.findById(charId);
	for (const id of chars) {
		if (character.knownContacts.findIndex((el) => el == id) === -1) {
			character.knownContacts.push(id);
		}
	}
	await character.save();
	character = await character.populateMe();
	nexusEvent.emit('respondClient', 'update', [character]);
	logger.info(`${character.characterName} edited.`);
	return { message: 'Contacts successfully shared!', type: 'success' };
}

module.exports = { createCharacter, modifyCharacter, modifySupport, modifyMemory, deleteCharacter, register, manageContacts, healInjury, shareContacts, pirate };