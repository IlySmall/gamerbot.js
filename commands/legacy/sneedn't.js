module.exports = {
	name: "sneedn't",
	description: "apply sneedn't",
    guildOnly:true,
    permissions:"rolemod global",
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Who do I sneedn't retard?`);
		}
        const sneedRole = message.guild.roles.cache.get("805789609396142120")
		const sneedList = message.mentions.users.map(user => {
            if(message.guild.members.cache.get(user.id).roles.cache.has("805789609396142120")==true){ //I fucking hate js
                message.guild.members.cache.get(user.id).roles.remove(sneedRole)
                return `${user.username} now s n e e d `;
            }
            else if(message.guild.members.cache.get(user.id).roles.cache.has("805789609396142120")==false){
                message.guild.members.cache.get(user.id).roles.add(sneedRole)
                return `${user.username} now s n e e d n ' t`;
            }
		});
		message.channel.send(sneedList);
	},
};