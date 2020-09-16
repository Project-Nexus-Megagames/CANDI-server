const events = require('events');

console.log('Project Nexus Events initiated...');
class NexusEvent extends events {}

module.exports = new NexusEvent();