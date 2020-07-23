const { logger } = require("../middleware/log/winston"); // Import of winston for error logging
const bodyParser = require('body-parser'); // Body Parser Middleware

// Routes - Using Express
const home = require('../routes/public/home');

// Route Function
module.exports = function(app) {
    logger.info('Route Middleware Loaded...')
    app.use(bodyParser.json()); // Tells Express to use Body Parser for JSON

    app.use('/', home);
}