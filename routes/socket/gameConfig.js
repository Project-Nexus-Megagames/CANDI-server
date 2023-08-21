const { createGameConfig } = require('../../game/gameConfig');

const { logger } = require('../../middleware/log/winston'); // middleware/error.js which is running [npm] winston for error handling

module.exports = {
	name: 'gameConfig',
	async function(client, req) {
		logger.info(
			`${client.username} has made a ${req.action} request in the ${req.route} route!`
		);
		const data = req.data;
		const type = req.action;
		try {
			let response;
			switch (type) {
				case 'create': {
					response = await createGameConfig(data, client.username);
					response.type === 'success' ? client.emit('clearLocalStorage') : null;
					break;
				}
				default: // need an error socket to trigger
					console.log('Bad action socket Request: ', type);
					response = {
						message: `Bad action socket Request: ${type}`,
						type: 'error'
					};
					break;
			}
			client.emit('alert', response);
		} catch (error) {
			client.emit('alert', {
				type: 'error',
				message: error.message ? error.message : error
			});
			logger.error(error);
		}
	}
};
