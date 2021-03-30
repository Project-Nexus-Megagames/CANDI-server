const { logger } = require('../middleware/log/winston');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const SocketServer = require('../scripts/socketServer'); // Client Tracking Object
const { Character } = require('../models/character');
const { Action } = require('../models/action');
const { GameState } = require('../models/gamestate');
const { Asset } = require('../models/asset');
const { editAction, removeEffort, addEffort, editResult, createAction, deleteAction } = require('../game/actions');
const { modifyCharacter, modifySupport, deleteCharacter, createCharacter } = require('../game/characters');
const { modifyAsset, lendAsset, deleteAsset } = require('../game/assets');
const { modifyGameState, closeRound, nextRound } = require('../game/gamestate');

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
				// console.log(data);
				response = await modifyCharacter(data);
				break;
			}
			case 'support': {
				// console.log(data);
				response = await modifySupport(data);
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
			default:
				console.log('Bad gamestateRequest Request: ', type); // need an error socket to trigger
				response = { message : `Bad gamestateRequest Request: ${type}`, type: 'error' };
				break;
			}
			client.emit('alert', response);
		});

		client.on('disconnect', () => {
			logger.info(`Client disconnecting from update service... ${client.id}`);
			Clients.delClient(client);
			console.log(`${Clients.connections.length} clients connected`);
		});
	});

	// all the old nexusUpdates I am leaving in so that I don't have to go fix any of the old html routes. 
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