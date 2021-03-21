const Discord = require('discord.js'); // if you don't have this you can't commit discord
var { prefix, token, globalCleanup, logchannel } = require('./cfg.json');
setInterval(() => {
    var cfg = require('./cfg.json');
    prefix = cfg.prefix;
    token = cfg.token;
    statusmsg = cfg.statusmsg;
    globalCleanup = cfg.globalCleanup;
}, 500);
const fs = require('fs'); // for checking filesystem.
const client = new Discord.Client(); // read please
let rolecid = "740408169712320592"
let rolemid = "816023313495228446"
const rolearr = ["749789244536389713", "740399821818429470", "721544565689155584", "739604745462874195", "740394347173773462", "739609241085804594", "740395831424974973", "740397121710325831", "740395459788668992", "740397783831412746", "739873729655472269", "740398278390054963", "740401142130933812", "740396629642706996", "718147584568328253", "749014983689371670"]
const emojiarr = ["754340781984317521", "717230296721915905", "717230616655167510", "740411552850509894", "740412109590102096", "740414056757985281", "740413386382377033", "745118447821914212", "740414636720914483", "740415675679506472", "719361899472486471", "740416254157783092", "797686113736327168", "720392147878150184", "740413659653603328", "717230297082757170"]
client.commands = new Discord.Collection(); // array<T> sorta of gay thing of commands.
const cooldowns = new Discord.Collection(); // ^ by cooldowns
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Okay so, it looks for the folder "commands"
// then get this, it looks for a file that ends with .js
// yeah, that's a command now.

for (const file of commandFiles) { // does node magic on the files
    const command = require(`./commands/${file}`); // how 2 command it
    client.commands.set(command.name, command); // command it exist
}

client.on('ready', () => { // Stuff that happens when the bot alives

    client.channels.cache.get(rolecid).messages.fetch(rolemid).then(m => {
        console.log("Cached reaction message.");
    }).catch(e => {
        console.error("Error loading message.");
        console.error(e);
    });

    console.log(`Logged in as ${client.user.tag}!`);
    const randomColor = () => { // does random color stuff.
        let color = '#';
        for (let i = 0; i < 6; i++) {
            const random = Math.random();
            const bit = (random * 16) | 0; color += (bit).toString(16); // uses bitwise cancer to make a string that gets concatenated to color.
        };
        return color;
    };
    setInterval(() => { //dumbass 24h interval on init
        var role = client.guilds.cache.get("716993263889809510").roles.cache.get("717177672119091201")
        function test() { // changes the colour and actually works basically, nowa fucking stupid.
            return role.setColor(randomColor())
        }
        test().then(function () {
            console.log("24h role color change successful.")
        })
            .catch(function (rej) {
                console.log(`error you dumb shit, <@686271040258572314> probably hasn't fixed the roles.cache:\n\`${rej}\``);
            })
    }, 86400000) // unnecessarily long time out because pepega.
});

client.on('message', message => {
    if (!message.content.startsWith(prefix)) { // The prefix if you can't read I apologise for you disability.
        client.user.setActivity({ name: `${statusmsg}` }) // sets status msg.
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/); // yeah okay sure. It works!
    const commandName = args.shift().toLowerCase();  // enumeration cringe.
    var content;
    if (!args[1]) { // makes magic happen don't worry about it standard checks imagine caring
        content = message.content.slice(prefix.length + commandName.length + 1).trim();
    }
    else {
        content = message.content.slice(prefix.length + args[0].length
            + commandName.length + 1).trim();
    }

    const command = client.commands.get(commandName) // gets command if you didn't understand this you probably shouldn't touch this.
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // It's legit the same shit.

    if (!command) return; // If it's not command don't do it.

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection()); // Basically an Array<T> that cooldowns get shoved into.
        // uses new as it's specific to the asshole who just called the command.
    }

    const now = Date.now(); // Again if you don't understand this you probably can't read
    const timestamps = cooldowns.get(command.name); // The cooldown for the command.
    const cooldownAmount = (command.cooldown || 3) * 1000; // again, read.

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount; // basically, checks if they can funny command.

        if (now < expirationTime) { // If it's not expired then uh look below.
            const timeLeft = (expirationTime - now) / 1000; // maths for when can I commit command again
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            // above tells you that info that yeah I mentioned already just read please.
        }
    }

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!'); // read the string
    }


    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (message.channel.type != "dm") { //thank you and fuck you MLG
        if (globalCleanup > 0) {
            message.delete({ "timeout": globalCleanup })
                .then(msg => console.log(`Deleted message from ${msg.author.username}, cleanup worky gud`))
                .catch(console.error);
        }

        switch (command.permissions) { // Don't touch this you fucking fool.
            case "admin noargs": {
                if (!message.guild.members.cache.get(message.author.id).hasPermission('ADMINISTRATOR') && args.length == 0) {
                    console.log("bruh1")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }

            case "admin args": {
                if (!message.guild.members.cache.get(message.author.id).hasPermission('ADMINISTRATOR') && args.length > 0) {
                    console.log("bruh2")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }

            case "admin global": {
                if (!message.guild.members.cache.get(message.author.id).hasPermission('ADMINISTRATOR')) {
                    console.log("bruh3")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }

            case "rolemod args": {
                if (!message.guild.members.cache.get(message.author.id).hasPermission('MANAGE_ROLES') && args.length > 0) {
                    console.log("bruh4")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }

            case "rolemod noargs": {
                if (!message.guild.members.cache.get(message.author.id).hasPermission('MANAGE_ROLES') && args.length == 0) {
                    console.log("bruh5")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }

            case "rolemod global": {
                if (!message.guild.members.cache.get(message.author.id).hasPermission('MANAGE_ROLES')) {
                    console.log("bruh6")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }
        }
    }

    try {
        command.execute(message, args, content);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!'); // the command didn't work basically.
    }
});

client.on("messageDelete", message => { // This make the message delete go brrrr.
    const delmsg = new Discord.MessageEmbed()
        .setTitle("Message deleted in NeKommunity (hopefully)")
        .setColor('#ff0000')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ "format": "png", "size": 1024 }))
        .setTimestamp()
        .setDescription(`Message deleted in <#${message.channel.id}> [Jump to channel](${message.url} 'Jump to channel')`)
        .addField("Message content: ", message.content || "Media.", false)
    if (message.attachments) {
        message.attachments.array().forEach(attachment => {
            delmsg.addField("Attachment:", attachment.proxyURL, true)
            if (attachment.proxyURL.includes(".png") || attachment.proxyURL.includes(".jpg") || attachment.proxyURL.includes(".gif")) {
                delmsg.setImage(attachment.proxyURL);
            }
        });
    }

    client.channels.cache.get(logchannel).send(delmsg);
});

client.on("messageUpdate", (oldMessage, newMessage) => { // This make the message rdit go brrrr.
    if (oldMessage.content === newMessage.content) {
        return;
    }

    let logEmbed = new Discord.MessageEmbed()
        .setTitle("Message edited in NeKommunity (hopefully)")
        .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL({ "format": "png", "size": 1024 })) //gets the author's avatar url.
        .setThumbnail(oldMessage.author.avatarURL)
        .setColor("#ffd500")
        .setDescription(`Message edited in <#${oldMessage.channel.id}> [Jump to message](${oldMessage.url} 'Jump to message')`)
        .addField("**Before**", oldMessage.content || "Media.", true)
        .addField("**After**", newMessage.content, true)
        .setTimestamp()
        .setFooter("User ID: " + oldMessage.author.id);
    if (oldMessage.attachments) {
        oldMessage.attachments.array().forEach(attachment => {
            logEmbed.addField("Attachment:", attachment.proxyURL, true)
            if (attachment.proxyURL.includes(".png") || attachment.proxyURL.includes(".jpg") || attachment.proxyURL.includes(".gif")) {
                logEmbed.setImage(attachment.proxyURL);
            }
        });
    }

    client.channels.cache.get(logchannel).send(logEmbed);

})

/*client.on("messageDeleteBulk", messages => {
    const delmsgs = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Messages deleted in '+messages[0].message.channel.name)
    .setAuthor(message.author.username)
    .setThumbnail(message.author.avatar)
    .setDescription(message.content)
    .setTimestamp()

    message.guild.channels.cache.get(logchannel).send(delmsgs)
})*/
//todo: move into bulk delete instead of event handler;


client.on("messageReactionAdd", (reaction, user) => { // message reactions go brr ver c00l
    var guild = reaction.message.guild;
    var reaction = reaction;
    if (reaction.message.id === rolemid) {
        emojiarr.forEach(function (e, i) {
            if (reaction.emoji.id == e) {
                guild.members.cache.get(user.id).roles.add(guild.roles.cache.get(rolearr[i]))
            }
        });
    }
})

client.on("messageReactionRemove", (reaction, user) => { // message reactions go brr ver c00l
    var guild = reaction.message.guild;
    var reaction = reaction;
    if (reaction.message.id === rolemid) {
        emojiarr.forEach(function (e, i) {
            if (reaction.emoji.id == e) {
                guild.members.cache.get(user.id).roles.remove(guild.roles.cache.get(rolearr[i]))
            }
        });
    }
})

client.login(token); //todo: comment the code you dumb shit