module.exports = {
	name: 'autoplay',
    description: 'music',
    usage:" ",
	execute(message,args,b,c,distube) {
        let mode = distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
	},
};

