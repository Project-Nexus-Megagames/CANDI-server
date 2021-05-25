const { logger } = require('../middleware/log/winston');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { Character } = require('../models/character');
const { Action } = require('../models/action');
const { GameState } = require('../models/gamestate');
const { Asset } = require('../models/asset');
const { editAction, editResult, createAction, createProject, deleteAction } = require('../game/actions');
const { modifyCharacter, modifySupport, deleteCharacter, createCharacter, modifyMemory, register } = require('../game/characters');
const { modifyAsset, lendAsset, deleteAsset, addAsset } = require('../game/assets');
const { modifyGameState, closeRound, nextRound, easterEgg } = require('../game/gamestate');
const config = require('config');
const { editLocation } = require('../game/locations');

module.exports = function(server) {
	logger.info('Socket.io servers initialized...');
	const io = require('socket.io')(server, {
		cors: {
			origin: config.get('socketCORS'),
			methods: ['GET', 'POST']
		}
	}); // Creation of websocket Server
	io.use((client, next) => {
		const { username, character, version } = client.handshake.auth;
		if (!username) return next(new Error('Invalid Username'));
		client.username = username;
		client.character = character;
		client.version = version;
		next();
	});

	io.on('connection', client => {
		console.log(`${client.username} connected (${client.id}), ${io.of('/').sockets.size} clients connected.`);
		client.emit('alert', { type: 'success', message: `${client.username} Connected to CANDI server...` });
		currentUsers();

		// Action Socket
		client.on('actionRequest', async (type, data) => {
			logger.info(`actionRequest triggered: ''${type}''`);
			let response;
			switch(type) {
			case 'create': {
				// console.log(data);
				response = await createAction(data);
				response.type === 'success' ? client.emit('clearLocalStorage', 'newActionState') : null ;
				break;
			}
			case 'delete': {
				// console.log(data);
				response = await deleteAction(data);
				break;
			}
			case 'createProject': {
				// console.log(data);
				response = await createProject(data);
				response.type === 'success' ? client.emit('clearLocalStorage', 'newProjectState') : null ;
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
				response.type === 'success' ? client.emit('clearLocalStorage', 'selectedActionState') : null ;
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
				response.type === 'success' ? client.emit('clearLocalStorage', 'newCharacterState') : null ;
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
				// console.log(data);
				response = await editLocation(data);
				response.type === 'success' ? client.emit('clearLocalStorage', 'editTerritoryState') : null ;
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
				response.type === 'success' ? client.emit('clearLocalStorage', 'addAssetState') : null ;
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

		client.on('logout', () => {
			console.log(`${client.username} disconnected (${client.id}), ${io.of('/').sockets.size} clients connected.`);
			client.emit('alert', { type: 'info', message: `${client.username} Logged out...` });
			client.disconnect();
			currentUsers();
		});

		client.on('disconnecting', reason => {
			console.log(client.rooms);
			console.log(reason);
		});

		client.on('disconnect', () => {
			console.log(`${client.username} (${client.id}) disconnected from update service, ${io.of('/').sockets.size} clients connected.`);
			currentUsers();
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

	function currentUsers() {
		const users = [];
		for (const [id, socket] of io.of('/').sockets) {
			users.push({
				userID: id,
				username: socket.username,
				character: socket.character ? socket.character : 'Unassigned',
				clientVersion: socket.version ? socket.version : 'Old Client'
			});
		}
		io.emit('clients', users);
	}
};