const Sauce = require('node-sauce')
const { MessageEmbed } = require('discord.js');
let sauce = new Sauce("b520754ef9e9082676caa54ec756dad14dbc4d44")
sauce.dbmask = [3,4,5,6,7,8,9,10,11,12,13,14,19,20,21,23,24,25,26,27,28,33,34,35,36,37,39,41]
sauce.numres = 1
module.exports = {
    name: 'sauce',
    description: 'Posts sauce. LIMITED TO 200 USES PER DAY.',
    aliases: ['src'],
    usage: " ",
    async execute(message) {
        const messages = await message.channel.messages.fetch({ limit: 2 });
        const lastMessage = messages.last();
        if(!lastMessage.attachments.last()&&!lastMessage.embeds[0]) return message.reply("there is no image in the last message.")
        if(lastMessage.embeds[0]){if(lastMessage.embeds[0].type!="image") return message.reply("there is no image in the last message.")}
        var pic = (lastMessage.attachments.last()?lastMessage.attachments.last().url:lastMessage.embeds[0].url);
        if (!pic.includes(".png") && !pic.includes(".jpg") && !pic.includes(".jpglarge") && !pic.includes(".pnglarge") && !pic.includes(".gif") && !pic.includes("pbs.twimg.com") && !pic.includes(".jpeg")) return message.reply("there is no image in the last message?")
        try{var res = await sauce(pic)}
        catch(e){console.error(e); message.reply("There has been an error:`"+e+"`")}
        var result = res[0]
        if(!result.similarity) return message.reply("Sauce not found at all or API limit exceeded.")
        if(result.similarity<50.0) return message.reply("Sauce similarity below 50%, thrown away.")
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
                { name: 'Similarity:', value: result.similarity, inline: true },
            )
            .setImage(pic)
            .setTimestamp()
            .setFooter('Please donate at https://paypal.me/nowabi if you like the bot');
            if(result.source) embed.addField((result.source.includes("http")?"\u200b":"Source:"), (result.source.includes("http")?`[Source](${result.source} 'Source of the image.')`:result.source))
            if(result.type) embed.addField("Type:",result.type,true)
            if(result.material) embed.addField("Source material:",result.material,true)
            if(result.creator) embed.addField("Artist:",result.creator,true)
            if(result.characters) embed.addField('Characters:', result.characters)
            if(result.part) embed.addField("Part:", result.part)
        message.channel.send({embeds:[embed]}) 
    },
};