const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'event',
	description: 'Announce an event. Restricted to the Event Organizer role.',
	guildOnly: true,
    cooldown:300,
	execute(message, args, content, client) {
		if(!message.member.roles.cache.has("875196025197969488")) return message.reply("You can't use that command.")
        var embed = new MessageEmbed()
            .setColor('#59bfff')
            .setTitle('New event!')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setThumbnail(message.author.avatarURL)
            .setDescription("Description: "+content)
            .addField('Time:',`<t:${args[0]}:F>`,true)
            .setTimestamp()
            .setFooter('Please donate at https://paypal.me/nowabi if you like the bot');
        client.guilds.cache.get("716993263889809510").channels.cache.get("877947724392169503").send({embeds:[embed]})
        client.guilds.cache.get("716993263889809510").channels.cache.get("877947724392169503").send("<@&875033404071084112>")
	},
};
