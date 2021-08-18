const Sauce = require('node-sauce')
const { MessageEmbed } = require('discord.js');
let sauce = new Sauce("b520754ef9e9082676caa54ec756dad14dbc4d44")
sauce.numres = 1
sauce.minsimilarity = 50.0
module.exports = {
    name: 'sauce',
    description: 'Posts sauce. LIMITED TO 200 USES PER DAY.',
    aliases: ['src'],
    usage: " ",
    async execute(message) {
        const messages = await message.channel.messages.fetch({ limit: 2 });
        const lastMessage = messages.last();
        if(!lastMessage.attachments.last()) return message.reply("there is no image in the last message.")
        var pic = lastMessage.attachments.last().url;
        if (!pic.includes(".png" || ".jpg" || ".jpglarge" || ".pnglarge" || ".gif")) return message.reply("there is no image in the last message.")
        var res = await sauce(pic)
        var result = res[0]
        if(!result.similarity) return message.reply("Sauce not found at all or API limit exceeded.")
        var urls=""
        if(result.ext_urls){
            result.ext_urls.forEach((e,i) => {
                urls+="[Link "+(i+1)+"]("+e+" 'Link to image.')\n"
            });
        }
        var embed = new MessageEmbed()
            .setColor('#59bfff')
            .setTitle('Sauce found(?)')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setThumbnail(result.thumbnail)
            .addFields(
                { name: 'URLs:', value: (urls?urls:"None.") },
                { name: (result.source.includes("http")?"\u200b":"Source:"), value: (result.source.includes("http")?`[Source](${result.source} 'Source of the image.')`:result.source) },
                { name: 'Similarity:', value: result.similarity, inline: true },
            )
            .setImage(pic)
            .setTimestamp()
            .setFooter('Please donate at https://paypal.me/nowabi if you like the bot');
            if(result.type) embed.addField("Type:",result.type,true)
            if(result.material) embed.addField("Source material:",result.material,true)
            if(result.creator) embed.addField("Artist:",result.creator,true)
            if(result.characters) embed.addField('Characters:', result.characters)
            if(result.part) embed.addField("Part:", result.part)
        message.channel.send(embed) //TODO: update for v13
    },
};