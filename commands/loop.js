module.exports = {
	name: 'loop',
    description: 'music',
    usage:" ",
    aliases:["repeat"],
    guildOnly: true,
	execute(message,args,b,c,distube) {
        let mode = distube.setRepeatMode(message, parseInt(args[0]));
        message.channel.send("Set loop mode to `" + (mode == 0 ? "None" : mode==1 ? "This song" : "Queue") + "`")
	},
};