const Discord = require('discord.js'); // if you don't have this you can't commit discord
var _ = require('underscore');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9');
var { prefix, token, globalCleanup, logchannel } = require('./cfg.json');
setInterval(() => {
    var cfg = require('./cfg.json');
    prefix = cfg.prefix;
    token = cfg.token;
    statusmsg = cfg.statusmsg;
    globalCleanup = cfg.globalCleanup;
}, 500);
const fs = require('fs'); // for checking filesystem.
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGES] }); // read please
let rolecid = "740408169712320592"
let rolemid = "816023313495228446"
let clientId = "772792940158255124"
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

/*const rest = new REST({ version: '9' }).setToken(token); //slash command REST cancer

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: client.commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();*/

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

client.on('messageCreate', message => {
    //sneed vibe check
    fs.readFile('sneed.json', function (err, data) {
        if (err) {
            throw err;
        }
        else {
            d = JSON.parse(data)
            for (var i = 0; i < d.punishlist.length; i++) {
                if (d.punishlist[i].endtime < Math.floor(new Date().getTime() / 1000)) {
                    try {
                        message.guild.members.cache.get(d.punishlist[i].userid).roles.remove(message.guild.roles.cache.get("805789609396142120"))
                        d.sneedhistory.push(d.punishlist.splice(i, 1)[0]);
                    }
                    catch (e) { console.error(e) }
                    fs.writeFile("sneed.json", JSON.stringify(d), (err) => {
                        if (err) {
                            throw err;
                        }
                    })
                }
            }
        }
    })
    //end of sneed vibe check

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

    if (command.guildOnly && message.channel.type === 'DM') {
        return message.reply('I can\'t execute that command inside DMs!'); // read the string
    }


    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (message.channel.type != "DM") { //thank you and fuck you MLG
        if (globalCleanup > 0) {
            setTimeout(() => message.delete().catch(console.error), globalCleanup)
        }

        switch (command.permissions) { // Don't touch this you fucking fool.
            case "admin noargs": {
                if (!message.guild.members.cache.get(message.author.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) && args.length == 0) {
                    console.log("bruh1")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }

            case "admin args": {
                if (!message.guild.members.cache.get(message.author.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) && args.length > 0) {
                    console.log("bruh2")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }

            case "admin global": {
                if (!message.guild.members.cache.get(message.author.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
                    console.log("bruh3")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }

            case "rolemod args": {
                if (!message.guild.members.cache.get(message.author.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES) && args.length > 0) {
                    console.log("bruh4")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }

            case "rolemod noargs": {
                if (!message.guild.members.cache.get(message.author.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES) && args.length == 0) {
                    console.log("bruh5")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }

            case "rolemod global": {
                if (!message.guild.members.cache.get(message.author.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES)) {
                    console.log("bruh6")
                    message.reply("fuck off normie you can't.")
                    return;
                }
                break;
            }
        }
    }

    try {
        command.execute(message, args, content, client, distube);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!'); // the command didn't work basically.
    }
});

client.on("messageDelete", message => { // This make the message delete go brrrr.
    if (message.guild == undefined) {
        return;
    }
    let log = new Discord.MessageEmbed()
        .setTitle("Message deleted in NeKommunity (hopefully)")
        .setColor('#ff0000')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ "format": "png", "size": 1024 }))
        .setTimestamp()
        .setDescription(`Message deleted in <#${message.channel.id}> [Jump to channel](${message.url} 'Jump to channel')`)
    if (message.attachments) {
        message.attachments.forEach(attachment => {
            log.addField("Attachment:", `[Link](${attachment.proxyURL} 'Attachment link')`, true)
            if (attachment.proxyURL.includes(".png") || attachment.proxyURL.includes(".jpg") || attachment.proxyURL.includes(".gif")) {
                log.setImage(attachment.proxyURL);
            }
        });
    }

    if (message.content.length < 1024) log.addField("**Message content:**", message.content || "Media.", false)
    else log.addField("**Message content:**", message.content.substring(0, 768).trim() + "...", false)

    let loggingChannel = message.guild.channels.cache.find(ch => ch.name === logchannel)
    if (!loggingChannel) return;
    loggingChannel.send({ embeds: [log] });
});

client.on("messageUpdate", (oldMessage, newMessage) => { // This make the message rdit go brrrr.
    if (oldMessage.content === newMessage.content) {
        return;
    }
    if (oldMessage.guild == undefined) {
        return;
    }
    let log = new Discord.MessageEmbed()
        .setTitle("Message edited in NeKommunity (hopefully)")
        .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL({ "format": "png", "size": 1024 })) //gets the author's avatar url.
        .setThumbnail(oldMessage.author.avatarURL)
        .setColor("#ffd500")
        .setDescription(`Message edited in <#${oldMessage.channel.id}> [Jump to message](${oldMessage.url} 'Jump to message')`)
        .setTimestamp()
        .setFooter("User ID: " + oldMessage.author.id);
    if (oldMessage.attachments) {
        oldMessage.attachments.forEach(attachment => {
            log.addField("Attachment:", `[Link](${attachment.proxyURL} 'Attachment link')`, true)
            if (attachment.proxyURL.includes(".png") || attachment.proxyURL.includes(".jpg") || attachment.proxyURL.includes(".gif")) {
                log.setImage(attachment.proxyURL);
            }
        });
        if (oldMessage.content.length < 1024) log.addField("**Before**", oldMessage.content || "Media.", true)
        else log.addField("**Before**", oldMessage.content.substring(0, 768).trim() + "...", true)
        if (newMessage.content.length < 1024) log.addField("**After**", newMessage.content || "Empty", true)
        else log.addField("**After**", newMessage.content.substring(0, 768).trim() + "...", true)
    }

    let loggingChannel = newMessage.guild.channels.cache.find(ch => ch.name === logchannel)
    if (!loggingChannel) return;
    loggingChannel.send({ embeds: [log] });
})

client.on("guildMemberAdd", member => {
    let log = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ "format": "png", "size": 1024 })) //gets the author's avatar url.
        .setThumbnail(member.user.avatarURL)
        .setColor("#ccccff")
        .setDescription(`A new user has joined ${member.guild.name}! Their account was created at ${member.user.createdAt}`)
        .setTimestamp()
        .setFooter("User ID: " + member.user.id);

    let loggingChannel = member.guild.channels.cache.find(ch => ch.name === logchannel)
    if (!loggingChannel) return;
    loggingChannel.send({ embeds: [log] });
})

client.on("guildMemberRemove", member => {
    let log = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ "format": "png", "size": 1024 })) //gets the author's avatar url.
        .setThumbnail(member.user.avatarURL)
        .setColor("#ff0000")
        .setDescription(`A user has left or been kicked from ${member.guild.name}.`)
        .setTimestamp()
        .setFooter("User ID: " + member.user.id);
    let loggingChannel = member.guild.channels.cache.find(ch => ch.name === logchannel)
    if (!loggingChannel) return;
    loggingChannel.send({ embeds: [log] })
})

client.on("guildMemberUpdate", (oldMember, newMember) => {
    var send = false
    let log = new Discord.MessageEmbed()
        .setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL({ "format": "png", "size": 1024 })) //gets the author's avatar url.
        .setThumbnail(oldMember.user.avatarURL)
        .setColor("#ffd500")
        .setDescription(`A user has been updated in ${oldMember.guild.name}.`)
        .setTimestamp()
        .setFooter("User ID: " + oldMember.user.id);
    if (oldMember.nickname != newMember.nickname) {
        send = true
        log.addField("Old Nickname:", oldMember.nickname || "None", true)
        log.addField("New Nickname:", newMember.nickname || "None", true)
    }
    if (oldMember.roles.cache != newMember.roles.cache) {

        if (_.difference(newMember.roles.cache, oldMember.roles.cache).length > 0) {
            send = true
            log.addField("Added roles: ", _.difference(newMember.roles.cache, oldMember.roles.cache))
        }
        if (_.difference(oldMember.roles.cache, newMember.roles.cache).length > 0) {
            send = true
            log.addField("Removed roles: ", _.difference(oldMember.roles.cache, newMember.roles.cache))
        }
    }
    let loggingChannel = oldMember.guild.channels.cache.find(ch => ch.name === logchannel)
    if (!loggingChannel || send == false) return;
    loggingChannel.send({ embeds: [log] })
})

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

//music bullshit here
const DisTube = require('distube')
const distube = new DisTube.default(client, { searchSongs: 0 });
distube
    .on("playSong", (queue, song) => {
        let embed = new Discord.MessageEmbed()
            .setAuthor(client.user.tag, client.user.displayAvatarURL({ "format": "png", "size": 1024 })) //gets the author's avatar url.
            .setThumbnail(client.user.avatarURL)
            .setColor("#ccccff")
            .setDescription(`Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``)
            .setTimestamp()
            .setFooter('Please donate at https://paypal.me/nowabi if you like the bot')
            .addField("Playing:", `\`${song.name}\` - \`${song.formattedDuration}\``)
        if (song.playlist) embed.addField("Playlist:", song.playlist.name)
        queue.textChannel.send({ embeds: [embed] })
    })
    .on("addSong", (queue, song) => queue.textChannel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user.username}`
    ))
    .on("addList", (queue, playlist) => queue.textChannel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue by ${playlist.user.username}`
    ))
    .on("error", (channel, error) => {
        channel.send("fucky wucky error oh no: " + error)
    })
client.login(token); //todo: comment the code you dumb shit
