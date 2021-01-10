const { logger } = require('../middleware/log/winston');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const SocketServer = require('../scripts/socketServer'); // Client Tracking Object
const { Character } = require('../models/character');
const { Action } = require('../models/action');
const { GameState } = require('../models/gamestate');

module.exports = function(server) {
	const Clients = new SocketServer();

	logger.info('Socket.io servers initialized...');
	const io = require('socket.io')(server); // Creation of websocket Server
	io.on('connection', client => {
		Clients.connections.push(client);
		client.emit('connect');
		console.log(`A user connected via ${client.id}!`);

		client.on('login', data => {
			Clients.saveUser(data, client);
			logger.info(`${data.username} has been registered as a socket subscriber...`);
		});

		client.on('disconnect', () => {
			logger.info(`Client disconnecting from update service... ${client.id}`);
			Clients.delClient(client);
			console.log(`${Clients.connections.length} clients connected`);
		});

		nexusEvent.on('updateCharacters', async () => {
			const characters = await Character.find();
			client.emit('updateCharacters', characters);
		});

		nexusEvent.on('updateActions', async () => {
			const actions = await Action.find();
			client.emit('updateActions', actions);
		});

		nexusEvent.on('updateGamestate', async () => {
			const gamestate = await GameState.findOne();
			client.emit('updateGamestate', gamestate);
		});

	});
};