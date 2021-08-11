module.exports = {
	name: 'ticket',
    description: 'File a ticket with the staff!',
    usage:" (insert a short-ish reason for ticket)",
    guildOnly: true,
	execute(message,args,content) {
        var isArgsContent=args[0]==content
        var topic = (isArgsContent ? args[0]:args[0]+content)
        var ticketname=message.author.tag+"_"+Date.now()
        message.channel.guild.channels.create(`${ticketname}`, {
            type: 'text',
            parent: '852629180009152533',
            topic: topic,
            nsfw:true,
            permissionOverwrites: [
               {
                id: message.author.id,
                allow: ['VIEW_CHANNEL']
              },
              {
                id: message.guild.id,
                deny: ['VIEW_CHANNEL']
              }, 
              {
                id: '731645572486004767',
                allow: ['VIEW_CHANNEL']
              },
              {
                id: '717177672119091201',
                allow: ['VIEW_CHANNEL']
              }
            ],
          })
        message.channel.send("Ticket created.")
        message.guild.channels.cache.find(channel=>channel.name==ticketname).send(`${message.author.toString()}, the ticket is **here**.`)
	},
};