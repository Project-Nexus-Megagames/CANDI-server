const { modifyAsset, lendAsset, deleteAsset, addAsset, unhideAll } = require('../../game/assets');
const { logger } = require('../../middleware/log/winston'); // middleware/error.js which is running [npm] winston for error handling

module.exports = {
	name: 'asset',
	async function(client, req) {
		logger.info(`${client.username} has made a ${req.action} request in the ${req.route} route!`);
		const { data } = req.data;
		const { type } = req.type;
		try {
			logger.info(`asset socket triggered: ''${type}''`);
			let response;
			switch(type) {
			case 'modify': {
				// console.log(data);
				response = await modifyAsset(data, client.username);
				break;
			}
			case 'lend': {
				// console.log(data);
				response = await lendAsset(data, client.username);
				break;
			}
			case 'delete': {
				// console.log(data);
				response = await deleteAsset(data, client.username);
				break;
			}
			case 'create': {
				// console.log(data);
				response = await addAsset(data, client.username);
				response.type === 'success' ? client.emit('clearLocalStorage', 'addAssetState') : null ;
				break;
			}
			case 'unhide': {
				response = await unhideAll(data, client.username);
				break;
			}
			default:
				console.log('Bad asset socket Request: ', type); // need an error socket to trigger
				response = { message : `Bad asset socket Request: ${type}`, type: 'error' };
				break;
			}
			logger.info(response);
			client.emit('alert', response);
		}
		catch (error) {
			client.emit('alert', { type: 'error', message: error.message ? error.message : error });
			logger.error(error);
		}
	}
};