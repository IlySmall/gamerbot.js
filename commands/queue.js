module.exports = {
	name: 'queue',
    description: 'music',
    usage:" ",
    guildOnly: true,
	execute(message,args,b,c,distube) {
        try {
            let queue = distube.getQueue(message);
            message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            ).slice(0, 10).join("\n"));
        }
        catch(e){
        console.log(e)
        message.channel.send("There is no queue, or an error.")
        }
	},
};