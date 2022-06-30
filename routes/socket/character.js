const { modifyCharacter, modifyMemory, modifySupport, register, deleteCharacter, createCharacter, manageContacts, healInjury, shareContacts, pirate } = require('../../game/characters');
const { logger } = require('../../middleware/log/winston'); // middleware/error.js which is running [npm] winston for error handling

module.exports = {
	name: 'character',
	async function(client, req) {
		const data = req.data;
		const type = req.action;
		try {
			logger.info(`character Socket triggered: ''${type}''`);
			let response;
			switch(type) {
			case 'modify': {
				response = await modifyCharacter(data);
				break;
			}
			case 'memory': {
				// console.log(data);
				response = await modifyMemory(data);
				break;
			}
			case 'support': {
				// console.log(data);
				response = await modifySupport(data);
				break;
			}
			case 'register': {
				// console.log(data);
				response = await register(data);
				break;
			}
			case 'pirate': {
				// console.log(data);
				response = await pirate(data);
				break;
			}
			case 'delete': {
				// console.log(data);
				response = await deleteCharacter(data);
				break;
			}
			case 'create': {
				// console.log(data);
				response = await createCharacter(data);
				response.type === 'success' ? client.emit('clearLocalStorage', 'newCharacterStateGW') : null ;
				break;
			}
			case 'manageContacts': {
				response = await manageContacts(data);
				response.type === 'success' ? client.emit('clearLocalStorage') : null;
				break;
			}
			case 'healInjury': {
				response = await healInjury(data);
				response.type === 'success' ? client.emit('clearLocalStorage') : null;
				break;
			}
			case 'share': {
				response = await shareContacts(data);
				response.type === 'success' ? client.emit('clearLocalStorage') : null;
				break;
			}
			default:
				console.log('Bad character Socket Request: ', type); // need an error socket to trigger
				response = { message : `Bad character Socket Request: ${type}`, type: 'error' };
				break;
			}
			client.emit('alert', response);
		}
		catch (error) {
			client.emit('alert', { type: 'error', message: error.message ? error.message : error });
			logger.error(error);
		}
	}
};