const { modifyGameState, closeRound, nextRound, easterEgg } = require('../../game/gamestate');
const { logger } = require('../../middleware/log/winston'); // middleware/error.js which is running [npm] winston for error handling

module.exports = {
	name: 'gamestate',
	async function(client, req) {
		logger.info(`${client.username} has made a ${req.action} request in the ${req.route} route!`);
		const { data } = req.data;
		const { type } = req.type;
		try {
			let response;
			switch(type) {
			case 'modify': {
				// console.log(data);
				response = await modifyGameState(data, client.username);
				break;
			}
			case 'closeRound': {
				// console.log(data);
				response = await closeRound();
				break;
			}
			case 'nextRound': {
				// console.log(data);
				response = await nextRound();
				break;
			}
			case 'easterEgg': {
				// console.log(data);
				response = await easterEgg(data);
				break;
			}
			default:
				console.log('Bad gamestateRequest Request: ', type); // need an error socket to trigger
				response = { message : `Bad gamestateRequest Request: ${type}`, type: 'error' };
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