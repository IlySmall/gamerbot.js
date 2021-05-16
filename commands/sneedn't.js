const fs = require('fs');

module.exports = {
    name: "sneedn't",
    description: "sneed not, mortal.",
    guildOnly: true,
    permissions: "admin global",
    execute(message, args, content) {
        if(args[0]=="list"){
            var reply = "`Current punishments:`\n";
            fs.readFile('sneed.json', function (err, data) {
                if (err) {
                    throw err;
                }
                else{
                    var json = JSON.parse(data)
                    for(x of json.punishlist){
                        reply+="<@"+x.userid+"> Reason: `"+x.reason+"`\n";
                    }
                    message.channel.send(reply||"None.",{"allowedMentions": { "users" : []}})
                }
            })
            return;
        }
        if(args[0]=="history"){
            var reply = "`History:`\n";
            fs.readFile('sneed.json', function (err, data) {
                if (err) {
                    throw err;
                }
                else{
                    var json = JSON.parse(data)
                    for(x of json.sneedhistory){
                        reply+="<@"+x.userid+"> Reason: `"+x.reason+"`\n";
                    }
                    message.channel.send(reply||"None.",{"allowedMentions": { "users" : []}})
                }
            })
            return;
        }
        else if (!message.mentions.users.size == 1 && args[0].length!=18) {
                return message.channel.send(`Smite one person please, dumbass?`);
            }
            const sneedRole = message.guild.roles.cache.get("805789609396142120")
            fs.readFile('sneed.json', function (err, data) {
                if (err) {
                    throw err;
                }
                else {
                    function switchres(a) {
                        switch (parseInt(a)) {
                            case 1:
                                return Math.floor(new Date().getTime() / 1000) + 86400;
                            case 3:
                                return Math.floor(new Date().getTime() / 1000) + 259200;
                            case 5:
                                return Math.floor(new Date().getTime() / 1000) + 432000;
                            case 7:
                                return Math.floor(new Date().getTime() / 1000) + 604800;
                            case 14:
                                return Math.floor(new Date().getTime() / 1000) + 1209600;
                            case 30:
                                return Math.floor(new Date().getTime() / 1000) + 2592000;
                            default:
                                return false;
                        }
                    }
                    var et = switchres(args[1])
                    if(et == false){
                        message.reply("pick a valid time.")
                        return;
                    }
                    if(message.mentions.users.size == 1){
                        message.guild.members.cache.get(message.mentions.users.array()[0].id).roles.add(sneedRole)
                        var sneed = {
                            userid: message.mentions.users.array()[0].id,
                            endtime: et,
                            reason: content.substr(2, content.length)
                        }
                    }
                    else{
                        message.guild.members.cache.get(args[0]).roles.add(sneedRole)
                        var sneed = {
                            userid: args[0],
                            endtime: et,
                            reason: content.substr(2, content.length)
                        }
                    }
                    var json = JSON.parse(data)
                    var rep = undefined;
                    for (var i = 0; i < json.punishlist.length; i++) {
                        if (json.punishlist[i].userid == sneed.userid) {
                            rep = i;
                        }
                    }
                    if (typeof (rep) != "undefined") {
                        json.punishlist[rep].endtime = sneed.endtime;
                        json.punishlist[rep].reason = sneed.reason;
                    }
                    else { json.punishlist.push(sneed) }
                    fs.writeFile("sneed.json", JSON.stringify(json), (err) => {
                        if (err) {
                            throw err;
                        }
                        else{
                            message.reply("punishment successful.")
                        }
                    })
                }
            })
        },
    };
