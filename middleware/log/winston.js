const errorDebugger = require('debug')('app:error');
const winston = require('winston');
// may need to comment out line below if we have problems with integration testing
require('winston-mongodb');
const config = require('config');


const dbName = config.get('dbName');
// const dbURI = require('../mongoDB/keys').mongoURI;
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@candi.zx3mbs8.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const { createLogger, format, transports } = winston;

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	defaultMeta: { service: 'Default Log:' },
	transports: [
		// - Write to all logs with level `info` and below to `nexus-combined.log`.
		// - Write all logs error (and below) to `nexus-error.log`.
		// Errors only File
		new transports.File({ filename: 'nexus-error.log', level: 'error' }),
		// Info / Warnings / Errors combined
		// new transports.File({ filename: 'nexus-combined.log', level: 'info' }),
		// Debug / Verbose/ Http / Info / Warnings / Errors combined
		new transports.File({
			filename: 'nexus-debug-combined.log',
			level: 'debug'
		}),
		// Error DB to log collection
		new transports.MongoDB({
			db: dbURI,
			level: 'error',
			metaKey: 'meta',
			collection: 'errors',
			options: { useUnifiedTopology: true }
		})
		// Info / Warnings / Errors combined
		// new transports.MongoDB({
		//	db: dbURI,
		//	level: 'info',
		//	metaKey: 'meta',
		//	collection: 'infos',
		//	options: { useUnifiedTopology: true }
		// })
	]
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new transports.Console({
			format: format.combine(format.colorize(), format.simple())
		})
	);
}
else {
	// use regular debug in non-production mode
	// debug.log = (...args) => logger.debug(util.format(...args))
}

// eslint-disable-next-line no-unused-vars
function routeError(err, req, res, next) {
	logger.error(`${err.message}`, { meta: err });

	errorDebugger('Error:', err.message);
	res.status(500).send(`Error: ${err.message}`);
}

module.exports = { routeError, logger };