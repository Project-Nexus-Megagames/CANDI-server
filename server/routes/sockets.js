const { logger } = require('../middleware/log/winston');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const SocketServer = require('../scripts/socketServer'); // Client Tracking Object
const { Character } = require('../models/character');
const { Action } = require('../models/action');
const { GameState } = require('../models/gamestate');
const { Asset } = require('../models/asset');

module.exports = function(server) {
	const Clients = new SocketServer();

	logger.info('Socket.io servers initialized...');
	const io = require('socket.io')(server);

	io.on('connection', client => {
		Clients.connections.push(client);
		client.emit('Hello');
		console.log(`A user connected via ${client.id}!`);

		client.on('login', data => {
			Clients.saveUser(data, client);
			logger.info(`${data.username} has been registered as a socket subscriber...`);
		});

		client.on('trigger', data => {
			nexusEvent.emit(`${data}`);
		});

		client.on('disconnect', () => {
			logger.info(`Client disconnecting from update service... ${client.id}`);
			Clients.delClient(client);
			console.log(`${Clients.connections.length} clients connected`);

			nexusEvent.off('updateCharacters', () => {
				console.log(`${client.id} updateCharacters listner offline...`);
			});

			nexusEvent.off('updateActions', () => {
				console.log(`${client.id} updateActions listner offline...`);
			});

			nexusEvent.off('updateGamestate', () => {
				console.log(`${client.id} updateGamestate listner offline...`);
			});

			nexusEvent.off('updateAssets', () => {
				console.log(`${client.id} updateAssets listner offline...`);
			});
		});

		nexusEvent.on('updateCharacters', async () => {
			const characters = await Character.find().populate('assets').populate('traits').populate('wealth').populate('lentAssets');
			client.emit('updateCharacters', characters);
		});

		nexusEvent.on('updateActions', async () => {
			const actions = await Action.find().populate('creator');
			client.emit('updateActions', actions);
		});

		nexusEvent.on('updateGamestate', async () => {
			const gamestate = await GameState.findOne();
			client.emit('updateGamestate', gamestate);
		});

		nexusEvent.on('updateAssets', async () => {
			const assets = await Asset.find();
			client.emit('updateAssets', assets);
		});

	});
};