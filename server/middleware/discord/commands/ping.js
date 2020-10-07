module.exports = {
	name: 'ping',
	aliases: [],
	description: 'Pinging to get that pong',
	args: false,
	usage: '',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send('Pong.');
	}
};