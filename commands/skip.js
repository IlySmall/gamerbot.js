module.exports = {
	name: 'skip',
    description: 'music',
    usage:" ",
    aliases: ['s'],
    guildOnly: true,
	execute(message,args,b,c,distube) {
        distube.skip(message)
        message.channel.send("Skipped current song.")
	},
};