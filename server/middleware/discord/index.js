const fs = require('fs'); // Node.js file system module
const Discord = require('discord.js'); // Discord.js NPM package
const settings = require('./botSettings.json'); // Bots settings
const { logger } = require('../log/winston'); // Error logging

const client = new Discord.Client({ disableEveryone: true }); // Creates Client socket for discord
client.commands = new Discord.Collection(); // Creates collection of commands for the bot

const commandFiles = fs.readdirSync('./middleware/discord/commands').filter(file => file.endsWith('.js')); // Loads command files

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

module.exports = function() {
	const prefix = settings.prefix; // Sets the prefix variable for the bot
	logger.info('Activating Central Nexus...');

	// Discord Event - On Login
	client.once('ready', async () => {
		logger.info(`${client.user.username} online...`);
		client.user.setActivity('Nexus Development', { type:'WATCHING' });
	});

	// Discord Event - On message in a channel that's being watched
	client.on('message', async message => {
		if (!message.content.startsWith(prefix) || message.author.bot) return; // Ignores messages from bots or without the command prefix
		logger.info(message);

		const args = message.content.slice(prefix.length).trim().split(/ +/); // Splits the message at any spaces
		const cmdName = args.shift().toLowerCase(); // Selects first element as the command

		if (!client.commands.has(cmdName)) return; // Exits if the given command isn't on the list

		const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName)); // Checks the command against all commands and alieses

		// Command argument check loop
		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.useage) {
				reply += `\nThe proper useage would be: \`${prefix}${command.name}${command.useage}\``;
			}

			return message.channel.send(reply);
		}

		// Command check for guild only messages
		if (command.guildOnly && message.channel.type === 'dm') {
			return message.reply(`${cmdName} cannot be used inside DMs!`);
		}

		// Command check for command cool-down
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
				}
			}
		}

		// Try/Catch block for actually activating the command
		try {
			command.execute(message, args);
		}
		catch (err) {
			logger.error(err);
			message.reply(`There was an error trying to execute the ${cmdName} command`);
		}
	});

	client.login(settings.token); // Login for the bot
};