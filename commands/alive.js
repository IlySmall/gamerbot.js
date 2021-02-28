const fs = require('fs');

module.exports = {
    name: 'alive',
    description: 'haha I live you nword',
    guildOnly:true,
    permissions:"admin args",
    execute(message, args, content) {
        var localcfg = require('../cfg.json');
        var { alivemsg, statusmsg, globalCleanup } = require('../cfg.json')
        if (!args.length) {
            message.reply(`${alivemsg}, the status is "Playing ${statusmsg}", the global cleanup timer is ${globalCleanup}ms`);
        }
        else if (args[0] == "edit") {
            localcfg.alivemsg = content;
            const data = JSON.stringify(localcfg);
            fs.writeFile('cfg.json', data, (err) => {
                if (err) {
                    throw err;
                }
                else {
                    message.reply("you have edited the message to '" + content + "' fuckboy.")
                }
            });
        }
        else if (args[0] == "status") {
            localcfg.statusmsg = content;
            const data = JSON.stringify(localcfg);
            fs.writeFile('cfg.json', data, (err) => {
                if (err) {
                    throw err;
                }
                else {
                    message.reply("you have edited the status to '" + content + "' fuckboy.")
                }
            });
        }
        else if (args[0] == "cleanup") {
            if (isNaN(args[1])||args.length>2){
                message.reply("fuck off and use one number you dipshit.")
                return; 
            }
            localcfg.globalCleanup = args[1];
            const data = JSON.stringify(localcfg);
            fs.writeFile('cfg.json', data, (err) => {
                if (err) {
                    throw err;
                }
                else {
                    message.reply("you have edited the message timeout to " + args[1] + " milliseconds fuckboy.")
                }
            });
        }
        else {
            message.reply("fuck off.")
        }
    }
}