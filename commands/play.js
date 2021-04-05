module.exports = {
	name: 'play',
    description: 'music',
    usage:" ",
	execute(message,args,b,c,distube) {
        distube.play(message, args.join(" "));
	},
};