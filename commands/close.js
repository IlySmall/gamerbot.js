module.exports = {
	name: 'close',
    description: 'Closes channel to the public.',
    usage:" ",
    permissions:"admin global",
    guildOnly: true,
	execute(message) {
        message.guild.channels.cache.get(message.channel.id).permissionOverwrites.set([
            {
               id: message.guild.id,
               deny: ['VIEW_CHANNEL'],
            },
          ]);
	},
};