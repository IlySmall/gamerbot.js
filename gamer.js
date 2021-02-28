const Discord = require('discord.js');
var { prefix, token, globalCleanup, logchannel } = require('./cfg.json');
setInterval(() => {
    var cfg = require('./cfg.json');
    prefix = cfg.prefix;
    token = cfg.token;
    statusmsg = cfg.statusmsg;
    globalCleanup = cfg.globalCleanup;
}, 500);
const fs = require('fs');
const { defaultMaxListeners } = require('ws');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const randomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++) {                                                           const random = Math.random();
        const bit = (random * 16) | 0;                                                      color += (bit).toString(16);
    };
    return color;
};
	setInterval(() => { //dumbass 24h interval on init
        var role = client.guilds.cache.get("716993263889809510").roles.cache.get("717177672119091201")
        function test() {
            return role.setColor(randomColor())
        }
        test().then(function () {
            console.log("24h role color change successful.")
        })
            .catch(function (rej) {
                console.log(`error you dumb shit, <@686271040258572314> probably hasn't fixed the roles:\n\`${rej}\``);
            })
    }        , 86400000)
});

client.on('message', message => {
    if (!message.content.startsWith(prefix)) {
        client.user.setActivity({ name: `${statusmsg}` })
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    var content;
    if (!args[1]) {
        content = message.content.slice(prefix.length + commandName.length + 1).trim();
    }
    else {
        content = message.content.slice(prefix.length + args[0].length
            + commandName.length + 1).trim();
    }

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }


    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (message.channel.type != "dm") { //thank you and fuck you MLG
        if (globalCleanup > 0) {
            message.delete({ "timeout": globalCleanup })
                .then(msg => console.log(`Deleted message from ${msg.author.username}, cleanup worky gud`))
                .catch(console.error);
        }

        switch (command.permissions) {
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
        message.reply('there was an error trying to execute that command!');
    }
});

client.on("messageDelete", message => {
    const delmsg = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Message deleted in '+message.channel.name)
    .setAuthor(message.author.username, message.author.displayAvatarURL({"format":"png","size":1024}))
    .setTimestamp()
    .setDescription(message.content)
    if(message.attachments.array[0]){
        delmsg.setThumbnail(message.attachments.array()[0].proxyURL)
    
    if(message.attachments){message.attachments.array().forEach(attachment => {
        if(!attachment.proxyURL.includes(".png")||!attachment.proxyURL.includes(".jpg")||!attachment.proxyURL.includes(".gif")){
            delmsg.addField("Attachment:", attachment.proxyURL, true)
        }
            else{delmsg.setImage(attachment.proxyURL);}
    });
    }}
    client.channels.cache.get(logchannel).send(delmsg);
});

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

client.on("messageUpdate", message => {
//todo
})

client.login(token); //todo: comment the code you dumb shit