const { logger } = require('../middleware/log/winston');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const SocketServer = require('../scripts/socketServer'); // Client Tracking Object
const { Character } = require('../models/character');
const { Action } = require('../models/action');
const { GameState } = require('../models/gamestate');
const { Asset } = require('../models/asset');
const { editAction, removeEffort, addEffort, editResult } = require('../game/actions');

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

		// Action Sockets
		client.on('createActionRequest', async (data) => {
			try {
				let newElement = new Action(data);
				const docs = await Action.find({ intent: data.intent });
				if (docs.length < 1) {
					const character = removeEffort(data);
					newElement = await newElement.save();
					const action = await Action.findById(newElement._id).populate('creator');

					logger.info(`Action "${newElement.intent}" created.`);

					io.emit('updateCharacter', character);
					io.emit('actionCreated', action);
					client.emit('Alert', { message : 'Action Creation Success', type: 'success' });
				}
				else {
					client.emit('Alert', { message : 'This Action Already Exists!', type: 'error' });
				}
			}
			catch (err) {
				logger.error(`message : Server Error: ${err.message}`);
				client.emit('Alert', { message : `Server Error: ${err.message}`, type: 'error' });
			}
		});

		client.on('deleteActionRequest', async (data) => {
			try {
				const id = data.id;
				let element = await Action.findById(id);
				if (element != null) {
					element = await Action.findByIdAndDelete(id);

					const character = await addEffort(element);
					console.log(character);

					logger.info(`Action with the id ${id} was deleted via Socket!`);

					io.emit('updateCharacter', character);
					io.emit('actionDeleted', id);
					client.emit('Alert', { message : 'Action Delete Success', type: 'success' });
				}
				else {
					client.emit('Alert', { message : 'No action with the id ${id} exists!', type: 'error' });
				}
			}
			catch (err) {
				logger.error(`message : Server Error: ${err.message}`);
				client.emit('Alert', { message : `Server Error: ${err.message}`, type: 'error' });
			}
		});

		client.on('updateActionRequest', async (data) => {
			let action;
			if (data.playerBoolean) {
				action = await editAction(data);
			}
			else {
				action = await editResult(data);
			}

			io.emit('updateAction', action);
			client.emit('Alert', { message : 'Action Edit Success', type: 'success' });
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