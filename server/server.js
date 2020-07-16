const express = require('express'); // Import of EXPRESS to create routing app
const http = require('http'); // Import of the NODE HTTP module to create the http server

console.log('Starting boot-up for Project Nexus Server...')

// Boot Processes
console.log('Looding start-up processes...')
const app = express(); // Init for express
console.log('Express Initilized...')
const server = http.createServer(app); // Creation of an HTTP server
console.log('HTTP web-server established...')
require('./routes/routes')(app); // Bootup for Express routes
require('./routes/sockets')(server); // Bootup for websocket server
// require('./middleware/log/logging')(); // Bootup for error handling
require('./middleware/mongoDB/db')(); // Bootup of MongoDB through Mongoose
// require('./middleware/config/config')(); // Bootup for special configurations
// require('./middleware/production/prod')(app); // Production compression and middleware

const port = process.env.PORT || 5000 // Server entry point - Node Server
server.listen(port, () => console.log(`Project Nexus server has started on port ${port}...`));