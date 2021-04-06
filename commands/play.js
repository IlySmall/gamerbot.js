module.exports = {
	name: 'play',
    description: 'music',
    usage:" ",
    guildOnly: true,
	execute(message,args,b,c,distube) {
        try{distube.play(message, args.join(" "));}
        catch(e){
            console.log(e)
            message.channel.send("You have to be in a voice channel or there is an error.")
        }
	},
};