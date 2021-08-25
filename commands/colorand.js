const randomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        const random = Math.random();
        const bit = (random * 16) | 0;
        color += (bit).toString(16);
    };
    return color;
};
const roleColor = (message, roleid) => {
    var role = message.guild.roles.cache.get(`${roleid}`)
    function test() {
        return role.setColor(randomColor())
    }
    test().then(function () {
        message.reply(`<@&${roleid}> color changed successfully.`)
    })
        .catch(function (rej) {
            message.channel.send(`error you dumb shit, <@686271040258572314> probably hasn't fixed the roles:\n\`${rej}\``);
        })
}

module.exports = {
    name: 'colorand',
    description: 'randomizes role color dipshit read the command name (permission locked)',
    usage: ' + role ID or ping (cannot be above bot in role hierarchy)',
    permissions:"rolemod global",
    cooldown:90,
    execute(message, args) {
        if (!args.length || args.length > 1) {
            message.reply("fuck off.")
        }
        else {
            if (isNaN(args[0]) == true) {
                if (args[0].indexOf("<@&") != -1) {
                    var roleid = args[0].slice(3, 21);
                    roleColor(message, roleid)
                }
                else {
                    message.reply("fuck off.")
                }
            }
            else {
                if (args[0].length != 18) {
                    message.reply("fuck off.")
                }
                else {
                    var roleid = args[0]
                    roleColor(message, roleid)
                }
            }
        }
    }
}


