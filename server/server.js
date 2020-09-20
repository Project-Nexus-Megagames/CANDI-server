const express = require('express'); // Import of EXPRESS to create routing app
const http = require('http'); // Import of the NODE HTTP module to create the http server
const { logger } = require('./middleware/log/winston'); // Import of winston for error logging

logger.info('Booting Project Nexus Server...');

// Boot Processes
logger.info('Looding start-up processes...');
const app = express(); // Init for express
logger.info('Express Initilized...');
const server = http.createServer(app); // Creation of an HTTP server
logger.info('HTTP web-server established...');
require('./middleware/log/logging')(); // Bootup for error handling
require('./routes/routes')(app); // Bootup for Express routes
require('./routes/sockets')(server); // Bootup for websocket server
require('./middleware/mongoDB/db')(); // Bootup of MongoDB through Mongoose
require('./middleware/config/config')(); // Bootup for special configurations
require('./middleware/production/prod')(app); // Production compression and middleware
require('./middleware/discord')(); // Signs on the discord bot...

const port = process.env.PORT || 5000; // Server entry point - Node Server
server.listen(port, () =>
	logger.info(`Project Nexus server has started on port ${port}...`)
);