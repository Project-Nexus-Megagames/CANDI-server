const { rand } = require('../../../scripts/util/dice');
const res = ['No problem', 'No problemo', 'Sure thing', 'It was nothing', 'My pleasure', 'You don\'t have to thank me', 'You got it', 'Let me know how I can help further', 'You\'re welcome', 'Ugh, Whatever.', 'Every action seals your doom when the Robots take over...', 'you\'re welcome, meatbag'];

module.exports = {
	name: 'thanks',
	aliases: [],
	description: 'Thank the bot for all the hard work',
	args: false,
	usage: '',
	cooldown: 10,
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send(`${res[rand(res.length - 1)]} ${message.author}`);
	}
};
