const Discord = require('discord.js');
var { logchannel } = require('../cfg.json');
module.exports = {
    name: 'clear',
    description: 'clear messages including the string specified posted within the past two weeks, arglist: including, excluding, number of messages to delete',
    guildOnly: true,
    //permissions: "admin global",
    aliases: ['cls', 'clr'],
    usage: " arg+string (if excluding/including)",
    execute(message, args, content, client) {
        if (args[0] == "including") {
            message.channel.messages.fetch({ limit: 100 }).then(msgs => {
                let msgDel = msgs.filter(msgss => msgss.content.includes(content))
                message.channel.bulkDelete(msgDel)
                .then(deletedMessages => {
                    const delmsgs = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${deletedMessages.size-1} message${deletedMessages.size-1 !== 1 ? 's' : ''} deleted in <#${deletedMessages.first().channel.id}> [Jump to channel](${deletedMessages.first().url} 'Jump to channel')`)
                        .setAuthor(client.user.tag, client.user.displayAvatarURL({ "format": "png", "size": 1024 }))
                        .setTimestamp()
                    let loggingChannel = deletedMessages.first().guild.channels.cache.find(ch => ch.name === logchannel)
                    if (!loggingChannel) return;
                    loggingChannel.send(delmsgs);
                })
                .catch(console.error);
            })
        }
        else if (!isNaN(args[0])) {
            var arg = parseInt(args[0])
            if (Number.isInteger(arg) == true && arg < 99 && arg > 1) {
                message.channel.messages.fetch({ limit: `${arg+1}` })
                    .then(messages => {
                        let msgDel = messages
                        message.channel.bulkDelete(msgDel)
                            .then(deletedMessages => {
                                const delmsgs = new Discord.MessageEmbed()
                                    .setColor('#ff0000')
                                    .setDescription(`${deletedMessages.size-1} message${deletedMessages.size-1 !== 1 ? 's' : ''} deleted in <#${deletedMessages.first().channel.id}> [Jump to channel](${deletedMessages.first().url} 'Jump to channel')`)
                                    .setAuthor(client.user.tag, client.user.displayAvatarURL({ "format": "png", "size": 1024 }))
                                    .setTimestamp()
                                let loggingChannel = deletedMessages.first().guild.channels.cache.find(ch => ch.name === logchannel)
                                if (!loggingChannel) return;
                                loggingChannel.send(delmsgs);
                            })
                            .catch(console.error);
                    })
                    .catch(console.error);
            }
            else {
                message.reply("Don't give me a decimal number, and make it less than 99.")
            }
        }
        else if (args[0] == "excluding") {
            message.channel.messages.fetch({ limit: 100 }).then(msgs => {
                let msgDel = msgs.filter(msgss => !msgss.content.includes(content))
                message.channel.bulkDelete(msgDel)
                .then(deletedMessages => {
                    const delmsgs = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${deletedMessages.size-1} message${deletedMessages.size-1 !== 1 ? 's' : ''} deleted in <#${deletedMessages.first().channel.id}> [Jump to channel](${deletedMessages.first().url} 'Jump to channel')`)
                        .setAuthor(client.user.tag, client.user.displayAvatarURL({ "format": "png", "size": 1024 }))
                        .setTimestamp()
                    let loggingChannel = deletedMessages.first().guild.channels.cache.find(ch => ch.name === logchannel)
                    if (!loggingChannel) return;
                    loggingChannel.send(delmsgs);
                })
                .catch(console.error);
            })
        }
        else {
            message.reply("fuck off.")
        }
    }
}