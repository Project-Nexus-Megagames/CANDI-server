module.exports = {
	name: 'thanks',
	aliases: [],
	description: 'Thank the bot for all the hard work',
	args: false,
	usage: '',
	cooldown: 10,
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send(`No problem ${message.author}`);
	}
};