module.exports = {
	name: 'hello',
	aliases: [],
	description: 'Exchanges greetings',
	args: false,
	usage: '',
	cooldown: 2,
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send(`Greetings ${message.author}`);
	}
};