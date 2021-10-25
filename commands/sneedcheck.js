const fs = require('fs');
const Discord = require('discord.js');
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second." : " seconds.") : "";
    return hDisplay + mDisplay + sDisplay; 
}

module.exports = {
    name: 'sneedcheck',
    description: 'Check your sneed.',
    guildOnly: true,
    execute(message) {
        fs.readFile('sneed.json', function (err, data) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.parse(data)
                for (var i = 0; i < json.punishlist.length; i++) {
                    if (json.punishlist[i].userid == message.author.id) {
                        var enddate = new Date(json.punishlist[i].endtime * 1000);
                        var timeleft = secondsToHms((enddate - Math.floor(new Date().getTime()))/1000)
                        let reply = new Discord.MessageEmbed()
                            .setAuthor(message.author.tag, message.author.displayAvatarURL({ "format": "png", "size": 1024 })) //gets the author's avatar url.
                            .setThumbnail(message.author.avatarURL)
                            .setColor("#ff0000")
                            .setDescription(`Your punishment is: `)
                            .addField("**Sneedn't**", `Until ${enddate} \n Time left: ${timeleft} \n For the reason of ${json.punishlist[i].reason}.`, false)
                            .setTimestamp()
                            .setFooter("User ID: " + message.author.id);
                        message.channel.send({embeds:[reply]});
                        return;
                    }
                }
                message.reply("You have no pending punishments.");
                return;
            }
        })
    },
};

