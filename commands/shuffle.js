module.exports = {
	name: 'shuffle',
    description: 'music',
    usage:" ",
    aliases: ['sh'],
    guildOnly: true,
	execute(message,a,b,c,distube) {
        try{distube.shuffle(message); message.channel.send("Queue shuffled, dipshit, enjoy your earrape!")}
        catch(e){
            console.log(e)
            message.channel.send("You have to be in a voice channel or there is an error.")
        }
	},
};