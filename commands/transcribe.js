async function ToFile(channel,data){
    const fs = require('fs');
    data=data.reverse().join("\n----------------------------------------------------------------------------------\n")
    await fs.writeFile("transcript.txt", data, (error)=>{if(error){console.error; channel.send("An error has occured.")} else channel.send("Transcript created successfully.")})
    channel.guild.channels.cache.find(channel=>channel.name==="transcripts").send({content: "Transcript of "+channel.name, files:[
        "transcript.txt"
    ]})
}
module.exports = {
	name: 'transcribe',
    description: 'Save a transcription of this ticket.',
    usage:" ",
    guildOnly: true,
	execute(message) {
        if(message.channel.parentId=="852629180009152533"){
            data=[]
            ended=false
            var channel=message.channel
                var lastId = channel.lastMessageId
                function fetch(lastId) {
                    channel.messages.fetch({ limit: 100, before: lastId }).then(messages => {
                        var i = 0
                        messages.forEach(msg => {
                            i++
                                var attachments = []
                                msg.attachments.forEach(attachment => {
                                    const url = attachment.url;
                                    attachments.push(url)
                                  });
                                data.push(msg.author.tag+"\n"+msg.content+"\n"+attachments.toString()+"\n"+msg.createdAt)
                            if (i == 100) {
                                var lastId = msg.id
                                fetch(lastId)
                            }
                        })
                        if(i!=100)ToFile(channel,data)
                    })
                    .catch(console.error); //ToFile(channel,data)
                }
                fetch(lastId)  
        }
        else{
            message.reply("You can't transcribe this, it's not a ticket.")
        }
	}
};
