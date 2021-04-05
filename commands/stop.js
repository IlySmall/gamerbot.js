module.exports = {
	name: 'stop',
    description: 'music',
    usage:" ",
    aliases:[],
	execute(message,args,b,c,distube) {
        distube.stop(message);
        message.channel.send("Stopped the music!");
	},
};