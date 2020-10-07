module.exports = {
	name: 'shutdown',
	description: 'Turns off the bot!',
	args: false,
	usage: '',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send(`Understood ${message.author}, shutting down...`);
		process.exit(1);
	}
};