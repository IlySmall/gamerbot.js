module.exports = {
	name: 'play',
    description: 'music',
    usage:" ",
    aliases: ['p'],
    guildOnly: true,
	execute(message,args,b,c,distube) {
        distube.play(message, args.join(" ")).catch((e) => {
            console.error(e)
            message.channel.send("There has been this: `"+e+"` error but I am most likely still alive, just try again")
        });
    },
};