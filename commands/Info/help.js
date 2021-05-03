const Discord = require('discord.js')

module.exports = {
    name: 'help',
    category: 'Info',
    description: "Help menu",
    run: (client, message) => {
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Help Menu')
        .addField('Info', '`help`')
        .addField('Bot Developer:', '! Ciaran#0017', true)
        .addField('Hosted By:', `SyncHost Network`, true)
        .setFooter('Help us make the bot better by providing feedback.')

        message.channel.send(embed)
    }
}