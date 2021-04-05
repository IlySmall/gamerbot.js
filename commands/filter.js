module.exports = {
	name: 'filter',
    description: 'music filters: 3d, bassboost, echo, karaoke, nightcore, vaporwave',
    usage:" ",
	execute(message,args,b,c,distube) {
        let filter = distube.setFilter(message, args[0]);
        message.channel.send("Current queue filter: " + (filter || "Off"));
	},
};