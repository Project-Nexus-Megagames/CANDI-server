const Discord = require('discord.js');
const settings = require('./botSettings.json');
const { logger } = require('../log/winston');

const { Info } = require('../../models/log/info');

const bot = new Discord.Client({disableEveryone: true});

module.exports = function () {
    logger.info('Activating Central Nexus...')
    
    bot.on('ready', async () => {
        logger.info(`${bot.user.username} online...`)
        bot.user.setActivity('Nexus Development', {type:'WATCHING'});
    })

    bot.on('message', async message => {
        logger.info(message);
        if (message.author.bot || message.channel.type === 'dm') return;

        const prefix = settings.prefix;
        let messageArray = message.content.split(' ');
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
        
        if (cmd === `${prefix}info`) {
            let info = await Info.find()
            return message.channel.send(`Server Info Count: ${info.length}`);
        }

        if (cmd === `${prefix}thanks`) {
            return message.channel.send(`No problem ${message.author}`);
        }

        if (cmd === `${prefix}shutdown`) {
            await message.channel.send(`Understood ${message.author}, shutting down...`);
            process.exit(1);
        }
    })

    bot.login(settings.token);
}
