const { editLocation, lockLocation, scavengeLocation } = require('../../game/locations');
const { logger } = require('../../middleware/log/winston'); // middleware/error.js which is running [npm] winston for error handling

module.exports = {
	name: 'location',
	async function(client, req) {
		const data = req.data;
		const type = req.action;
		logger.info(`location socket triggered: ''${type}''`);
		let response;
		try {
			switch (type) {
			case 'modify': {
				// console.log(data);
				response = await editLocation(data);
				response.type === 'success'
					? client.emit('clearLocalStorage', 'editTerritoryStateGW')
					: null;
				break;
			}
			case 'lockLocation': {
				response = await lockLocation(data);
				response.type === 'success' ? client.emit('clearLocalStorage') : null;
				break;
			}
      case 'scavenge': {
				response = await scavengeLocation(data);
				response.type === 'success' ? client.emit('clearLocalStorage') : null;
				break;
			}
			default: // need an error socket to trigger
				console.log('Bad location socket Request: ', type);
				response = {
					message: `Bad location socket Request: ${type}`,
					type: 'error'
				};
				break;
			}
			client.emit('alert', response);
		}
		catch (error) {
			client.emit('alert', {
				type: 'error',
				message: error.message ? error.message : error
			});
			logger.error(error);
		}
	}
};
