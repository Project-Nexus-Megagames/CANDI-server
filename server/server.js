const express = require('express'); // Import of EXPRESS to create routing app
const http = require('http'); // Import of the NODE HTTP module to create the http server
const { logger } = require('./middleware/log/winston'); // Import of winston for error logging
const timeout = require('connect-timeout');
require('newrelic'); // middleware for server monitoring on Heroku

logger.info('Booting Project Nexus Server...');

// Boot Processes
logger.info('Looding start-up processes...');
const app = express(); // Init for express
app.use(timeout('12s'));
app.use(haltOnTimedout);
logger.info('Express Initilized...');
const server = http.createServer(app); // Creation of an HTTP server
logger.info('HTTP web-server established...');
require('./middleware/log/logging')(); // Bootup for error handling
require('./routes/routes')(app); // Bootup for Express routes
require('./routes/sockets')(server); // Bootup for websocket server
require('./middleware/mongoDB/db')(); // Bootup of MongoDB through Mongoose
require('./middleware/config/config')(); // Bootup for special configurations
require('./middleware/production/prod')(app); // Production compression and middleware
// require('./middleware/discord')(); // Signs on the discord bot...

app.use((err, req, res, next) => {
	logger.error(`Response Teimout and Terminated: ${err}`);
	res.status(500).send('Response timeout!!!');
});

function haltOnTimedout(req, res, next) {
	if (!req.timedout) next();
	else console.log('Timeout!!!!');
}


const port = process.env.PORT || 5000; // Server entry point - Node Server
server.listen(port, () =>
	logger.info(`Project Nexus server has started on port ${port}...`)
);