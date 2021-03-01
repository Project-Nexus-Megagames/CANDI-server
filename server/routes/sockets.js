const { logger } = require('../middleware/log/winston');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const SocketServer = require('../scripts/socketServer'); // Client Tracking Object
const { Character } = require('../models/character');
const { Action } = require('../models/action');
const { GameState } = require('../models/gamestate');
const { Asset } = require('../models/asset');
const { editAction } = require('../game/actions');

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

		client.on('updateActionRequest', async (data) => {
			const action = await editAction(data);
			io.emit('updateAction', action);
			client.emit('Alert', { message : 'Action Socket Success' });
		});

		client.on('disconnect', () => {
			logger.info(`Client disconnecting from update service... ${client.id}`);
			Clients.delClient(client);
			console.log(`${Clients.connections.length} clients connected`);
		});
	});

	nexusEvent.on('updateCharacters', async () => {
		const characters = await Character.find().populate('assets').populate('traits').populate('wealth').populate('lentAssets');
		io.emit('updateCharacters', characters);
	});

	nexusEvent.on('updateActions', async () => {
		const actions = await Action.find().populate('creator');
		io.emit('updateActions', actions);
	});

	nexusEvent.on('updateGamestate', async () => {
		const gamestate = await GameState.findOne();
		io.emit('updateGamestate', gamestate);
	});

	nexusEvent.on('updateAssets', async () => {
		const assets = await Asset.find();
		io.emit('updateAssets', assets);
	});

};