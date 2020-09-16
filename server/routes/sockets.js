const { logger } = require('../middleware/log/winston');

module.exports = function(server) {
	logger.info('Socket.io servers initialized...');
	const io = require('socket.io')(server); // Creation of websocket Server
};