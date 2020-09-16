const Discord = require('discord.js');
const settings = require('./botSettings.json');
const { logger } = require('../log/winston');

const { Info } = require('../../models/log/info');

const bot = new Discord.Client({ disableEveryone: true });

module.exports = function() {
	const prefix = settings.prefix;
	logger.info('Activating Central Nexus...');

	bot.once('ready', async () => {
		logger.info(`${bot.user.username} online...`);
		bot.user.setActivity('Nexus Development', { type:'WATCHING' });
	});

	bot.on('message', async message => {
		logger.info(message);
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const cmd = args.shift().toLowerCase();

		if (cmd === 'info') {
			const info = await Info.find();
			return message.channel.send(`Server Info Count: ${info.length}`);
		}

		if (cmd === 'thanks') {
			return message.channel.send(`No problem ${message.author}`);
		}

		if (cmd === 'shutdown') {
			await message.channel.send(`Understood ${message.author}, shutting down...`);
			process.exit(1);
		}
	});

	bot.login(settings.token);
};
