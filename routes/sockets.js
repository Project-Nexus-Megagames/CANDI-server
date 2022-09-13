const { logger } = require('../middleware/log/winston');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const config = require('config');

const { Character } = require('../models/character');
const { Action } = require('../models/action');
const { GameState } = require('../models/gamestate');
const { Asset } = require('../models/asset');
const fs = require('fs'); // Node.js file system module

const socketFiles = fs.readdirSync('./routes/socket/').filter(file => file.endsWith('.js')); // Loads spell files
const socketMap = new Map();
const serverVersion = config.get('version')

logger.info(`Server version: ${serverVersion}`);
logger.info('Mapping sockets...');
for (const file of socketFiles) {
	const sock = require(`./socket/${file}`);
	// set a new item in the Collection
	// with the key as the sock name and the value as the exported module
	if (sock.name) {
		socketMap.set(sock.name, sock);
	}
}

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

		client.on('request', (req) => {
			console.log(req);
			// Request object: { route, action, data }
			if (!req.route) {
				client.emit('alert', { type: 'error', message: 'Socket Request missing a route...' });
			}
			else if (!req.action) {
				client.emit('alert', { type: 'error', message: 'Socket Request missing an action type...' });
			}
			else {
				const socket = socketMap.get(req.route);
				if (socket) {
					try {
						socket.function(client, req, io);
					}
					catch (err) {
						logger.error(err);
					}
				}
				else {
					client.emit('alert', { message : `Socket-file not found! Route: ${req.route}\nAction: ${req.action}`, type: 'error' });
				}
			}
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
		const characters = await Character.find().populate('lentAssets');
		io.emit('updateCharacters', characters);
	});

	nexusEvent.on('updateActions', async () => {
		console.log('Updating...');
		const actions = await Action.find()
			.populate('comments')
			.populate('creator');
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
		case 'refresh':
			io.emit('alert', { type: 'refresh', message: 'Logged Out' });
			break;
		case 'bitsy':
			io.emit('bitsy', { action: data.action });
			break;
		case 'notification':
			io.emit('alert', { type: 'article', data });
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