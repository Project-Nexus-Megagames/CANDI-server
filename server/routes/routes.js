const { logger } = require('../middleware/log/winston'); // Import of winston for error logging
const bodyParser = require('body-parser'); // Body Parser Middleware

// Routes - Using Express
const home = require('../routes/public/home');

// API Routes - Using Express.js
// Desc - API routes are the raw HTTP GET/POST/DEL access to our models
const player = require('./api/players');
const action = require('./api/actions');

// Route Function
module.exports = function(app) {
	logger.info('Route Middleware Loaded...');
	app.use(bodyParser.json()); // Tells Express to use Body Parser for JSON
	app.use('/api/players', player);
	app.use('/api/actions', action);


	app.use('/', home);
};