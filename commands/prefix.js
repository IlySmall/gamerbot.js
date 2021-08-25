const fs = require('fs');

module.exports = {
    name: 'prefix',
    description: 'change the prefix to what you just said or see the current one with no argument (permission locked)',
    permissions:"admin args",
    guildOnly:true,
    execute(message, args) {
        var localcfg = require('../cfg.json');

        if (!args.length) {
            message.reply("the current prefix is " + localcfg.prefix + " you dumb fuck");
        }
        else if (args.length > 1) {
            message.reply("Give me one prefix, shitcunt.");
        }
        else if (args[0].length > 1) {
            message.reply("Give me a one character prefix, dumb shit.");
        }
        else {
            localcfg.prefix = args[0];
            const data = JSON.stringify(localcfg);
            fs.writeFile('cfg.json', data, (err) => {
                if (err) {
                    throw err;
                }
            });
            message.reply("I changed it fuckface");
        }
    }
}
