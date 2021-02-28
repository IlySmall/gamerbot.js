module.exports = {
    name: 'clear',
    description: 'clear messages including the string specified posted within the past two weeks, arglist: including, excluding, number of messages to delete',
    guildOnly: true,
    permissions: "admin global",
    aliases: ['cls', 'clr'],
    usage: " arg+string (if excluding/including)",
    execute(message, args, content) {
        if (args[0] == "including") {
            message.channel.messages.fetch({ limit: 100 }).then(msgs => {
                let msgDel = msgs.filter(msgss => msgss.content.includes(content))
                message.channel.bulkDelete(msgDel)
                    .then(deletedMessages => message.channel.send(`Deleted **${deletedMessages.size}** message${deletedMessages.size !== 1 ? 's' : ''}.`))
                    .catch(console.error);
            })
        }
        else if (!isNaN(args[0])) {
            var arg = parseInt(args[0])
            if (Number.isInteger(arg) == true && arg < 100 && arg > 1) {
                message.channel.messages.fetch({ limit: `${arg}` })
                    .then(messages => {
                        let msgDel = messages
                        message.channel.bulkDelete(msgDel)
                            .then(deletedMessages => message.channel.send(`Deleted **${deletedMessages.size}** message${deletedMessages.size !== 1 ? 's' : ''}.`))
                            .catch(console.error);
                    })
                    .catch(console.error);
            }
            else {
                message.reply("Don't give me a decimal number you dipshit, and make it less than 100.")
            }
        }
        else if (args[0] == "excluding") {
            message.channel.messages.fetch({ limit: 100 }).then(msgs => {
                let msgDel = msgs.filter(msgss => !msgss.content.includes(content))
                message.channel.bulkDelete(msgDel)
                    .then(deletedMessages => message.channel.send(`Deleted **${deletedMessages.size}** message${deletedMessages.size !== 1 ? 's' : ''}.`))
                    .catch(console.error);
            })
        }
        else {
            message.reply("fuck off.")
        }
    }
}