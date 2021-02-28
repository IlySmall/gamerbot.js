const fs = require('fs');
var _ = require('underscore');

module.exports = {
    name: 'suggest',
    description: 'suggest new commands for this pile of debug',
    usage: 'command name (one word, previously unused) + the description of what the fuck you want it to do. Call with no arguments to dump the current command list.',
    permissions:"admin noargs",
    execute(message, args, content) {
        var localdb = require('../ideadb.json');

        if (!args.length) {
            message.reply("```" + JSON.stringify(localdb) + "```");
        }
        else if (args.length == 1) {
            message.reply("Go fuck yourself.")
        }
        else {
            var newmap = new Map()
            newmap.set(args[0]+" by "+message.author.tag, content)
            var newcmd = Object.fromEntries(newmap);
            if (!localdb.hasOwnProperty(args[0]+" by "+message.author.tag)) {
                _.extend(localdb, newcmd);
            }
            else {
                message.reply("You already suggested this name, \n***Y O U  A B S O L U T E  F U C K I N G  R E T A R D***,\n pick another name.")
                return;
            }
            const data = JSON.stringify(localdb);
            fs.writeFile('ideadb.json', data, (err) => {
                if (err) {
                    throw err;
                }
                else {
                    message.reply("you have appended your dumbass idea to a probably broken JSON file, retard, congrats on wasting your time.")
                }
            });
        }
    }
}