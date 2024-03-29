const { logger } = require('../middleware/log/winston'); // Import of winston for error logging
const bodyParser = require('body-parser'); // Body Parser Middleware
const cors = require('cors');

// Routes - Using Express
const home = require('../routes/public/home');

// API Routes - Using Express.js
// Desc - API routes are the raw HTTP GET/POST/DEL access to our models
const character = require('./api/characters');
const action = require('./api/actions');
const article = require('./api/articles');
const asset = require('./api/assets');
const location = require('./api/locations');
const gamestate = require('./api/gamestate');
const history = require('./api/history');
const comment = require('./api/comment');
const debugRoute = require('./api/debugRoute');
const gameConfig = require('./api/gameConfig');
const cloudinaryUpload = require('./api/cloudinaryUpload');
const log = require('./api/log');

// Route Function
module.exports = function(app) {
// Cors use to allow CORS (Cross-Origin Resource Sharing) [Remove before deployment!]
	app.use(cors());

	logger.info('Route Middleware Loaded...');
	app.use(bodyParser.json()); // Tells Express to use Body Parser for JSON
	app.use('/api/characters', character);
	app.use('/api/actions', action);
	app.use('/api/articles', article);
	app.use('/api/assets', asset);
	app.use('/api/locations', location);
	app.use('/api/gamestate', gamestate);
	app.use('/api/history', history);
	app.use('/api/comment', comment);
	app.use('/api/debugRoute', debugRoute);
	app.use('/api/gameConfig', gameConfig);
	app.use('/api/imageUpload', cloudinaryUpload);
	app.use('/api/log', log);

	app.use('/', home);
};