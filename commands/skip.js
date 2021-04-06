module.exports = {
	name: 'skip',
    description: 'music',
    usage:" ",
	execute(message,args,b,c,distube) {
        distube.skip(message)
        message.channel.send("Skipped current song.")
	},
};