module.exports = {
    name: "drunk",
    description: "unadmin isi",
    guildOnly: true,
    execute(message) {
        const dwunk = message.guild.roles.cache.get("810371133576314931")
        async function fuckyoujsyoupieceofshit(){
            const isi = await message.guild.members.fetch("675226310469222401")
            if (!message.guild.members.cache.get(message.author.id).roles.cache.has("717177672119091201") || !message.author.id == "686271040258572314") {
                return message.channel.send(`no`);
            }
            else if (isi.roles.cache.has("810371133576314931") == true) { //I fucking hate js
                isi.roles.remove(dwunk)
            }
            else if (isi.roles.cache.has("810371133576314931") == false) {
                isi.roles.add(dwunk)
            }
            message.channel.send("dwunk");
        } 
        fuckyoujsyoupieceofshit();
    },
};