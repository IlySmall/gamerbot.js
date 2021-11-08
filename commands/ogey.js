module.exports = {
        name: 'ogey',
        description: 'rrat, also gives you the ping',
        usage: " ",
        cooldown:90,
        execute(message) {
                var rrat = Date.now() - message.createdTimestamp
                message.reply("rrat(" + rrat + "ms)");
        },
};
