module.exports = {
	name: 'play',
    description: 'music',
    usage:" ",
    guildOnly: true,
	execute(message,args,b,c,distube) {
        distube.play(message, args.join(" "));
	},
};