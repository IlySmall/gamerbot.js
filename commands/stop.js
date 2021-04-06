module.exports = {
	name: 'stop',
    description: 'music',
    usage:" ",
    aliases:[],
    guildOnly: true,
	execute(message,args,b,c,distube) {
        distube.stop(message);
        message.channel.send("Stopped the music!");
	},
};