module.exports = {
	name: 'loop',
    description: 'music',
    usage:" ",
    aliases:["repeat"],
	execute(message,args,b,c,distube) {
        distube.setRepeatMode(message, parseInt(args[0]));
	},
};