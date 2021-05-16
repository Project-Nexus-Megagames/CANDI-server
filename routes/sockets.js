const { logger } = require('../middleware/log/winston');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const SocketServer = require('../scripts/socketServer'); // Client Tracking Object
const { Character } = require('../models/character');
const { Action } = require('../models/action');
const { GameState } = require('../models/gamestate');
const { Asset } = require('../models/asset');
const { editAction, editResult, createAction, deleteAction } = require('../game/actions');
const { modifyCharacter, modifySupport, deleteCharacter, createCharacter, modifyMemory, register } = require('../game/characters');
const { modifyAsset, lendAsset, deleteAsset, addAsset } = require('../game/assets');
const { modifyGameState, closeRound, nextRound, easterEgg } = require('../game/gamestate');
const config = require('config');
const { editLocation } = require('../game/locations');

module.exports = function(server) {
	const Clients = new SocketServer();

	logger.info('Socket.io servers initialized...');
	const io = require('socket.io')(server, {
		cors: {
			origin: config.get('socketCORS'),
			methods: ['GET', 'POST']
		}
	}); // Creation of websocket Server
	io.use((client, next) => {
		const username = client.handshake.auth.username;
		if (!username) return next(new Error('Invalid Username'));
		client.username = username;

		next();
	});

	io.on('connection', client => {
		logger.info(`${client.username} connected (${client.id}), ${io.of('/').sockets.size} clients connected.`);
		const users = [];
		for (const [id, socket] of io.of('/').sockets) {
			users.push({
				userID: id,
				username: socket.username
			});
			console.log(`${users.length} clients connected`);
		}
		io.emit('clients', users);

		// Action Socket
		client.on('actionRequest', async (type, data) => {
			logger.info(`actionRequest triggered: ''${type}''`);
			let response;
			switch(type) {
			case 'create': {
				// console.log(data);
				response = await createAction(data);
				break;
			}
			case 'delete': {
				// console.log(data);
				response = await deleteAction(data);
				break;
			}
			case 'createProject': {
				// console.log(data);
				response = await deleteAction(data);
				break;
			}
			case 'update': {
				// console.log(data);
				if (data.playerBoolean) {
					response = await editAction(data);
				}
				else {
					response = await editResult(data);
				}
				break;
			}
			default:
				console.log('Bad actionRequest Request: ', type); // need an error socket to trigger
				response = { message : `Bad actionRequest Request: ${type}`, type: 'error' };
				break;
			}
			client.emit('alert', response);
		});

		// Character Socket
		client.on('characterRequest', async (type, data) => {
			logger.info(`characterRequest triggered: ''${type}''`);
			let response;
			switch(type) {
			case 'modify': {
				console.log(data);
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
			case 'delete': {
				// console.log(data);
				response = await deleteCharacter(data);
				break;
			}
			case 'create': {
				// console.log(data);
				response = await createCharacter(data);
				break;
			}
			default:
				console.log('Bad characterRequest Request: ', type); // need an error socket to trigger
				response = { message : `Bad characterRequest Request: ${type}`, type: 'error' };
				break;
			}
			client.emit('alert', response);
		});

		// Character Socket
		client.on('locationRequest', async (type, data) => {
			logger.info(`locationRequest triggered: ''${type}''`);
			let response;
			switch(type) {
			case 'modify': {
				console.log(data);
				response = await editLocation(data);
				break;
			}
			default:
				console.log('Bad locationRequest Request: ', type); // need an error socket to trigger
				response = { message : `Bad locationRequest Request: ${type}`, type: 'error' };
				break;
			}
			client.emit('alert', response);
		});

		// Asset Socket
		client.on('assetRequest', async (type, data) => {
			logger.info(`assetRequest triggered: ''${type}''`);
			let response;
			switch(type) {
			case 'modify': {
				// console.log(data);
				response = await modifyAsset(data);
				break;
			}
			case 'lend': {
				// console.log(data);
				response = await lendAsset(data);
				break;
			}
			case 'delete': {
				// console.log(data);
				response = await deleteAsset(data);
				break;
			}
			case 'create': {
				// console.log(data);
				response = await addAsset(data);
				break;
			}
			default:
				console.log('Bad assetRequest Request: ', type); // need an error socket to trigger
				response = { message : `Bad assetRequest Request: ${type}`, type: 'error' };
				break;
			}
			logger.info(response);
			client.emit('alert', response);
		});

		client.on('gamestateRequest', async (type, data) => {
			logger.info(`gamestateRequest triggered: ''${type}''`);
			let response;
			switch(type) {
			case 'modify': {
				// console.log(data);
				response = await modifyGameState(data);
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
				response = await easterEgg();
				break;
			}
			default:
				console.log('Bad gamestateRequest Request: ', type); // need an error socket to trigger
				response = { message : `Bad gamestateRequest Request: ${type}`, type: 'error' };
				break;
			}
			client.emit('alert', response);
		});

		client.on('disconnect', () => {
			logger.info(`Client disconnecting from update service... ${client.id}`);
			// Clients.delClient(client);
			console.log(`${users.length} clients connected`);
		});
	});

	// all the old nexusUpdates I am leaving in so that I don't have to go fix any of the old html routes.
	nexusEvent.on('updateCharacters', async () => {
		const characters = await Character.find().populate('assets').populate('lentAssets');
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

	nexusEvent.on('respondClient', async (type, data) => {
		switch(type) {
		case 'update':
			io.emit('updateClients', data);
			break;
		case 'delete':
			io.emit('deleteClients', data);
			break;
		case 'create':
			io.emit('createClients', data);
			break;
		default:
			logger.error('Scott Should never see this....');
		}
	});

};