const bodyParser = require('body-parser'); // Body Parser Middleware

// Routes - Using Express
const home = require('../routes/public/home');

// Route Function
module.exports = function(app) {
    console.log('Route Middleware Loaded...')
    app.use(bodyParser.json()); // Tells Express to use Body Parser for JSON

    app.use('/', home);
}