const socketDebugger = require('debug')('app:sockets');

module.exports = function (server) {
  const io = require('socket.io')(server); // Creation of websocket Server
};