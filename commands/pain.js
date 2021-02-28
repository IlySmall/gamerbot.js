module.exports = {
	name: 'pain',
    description: 'Posts AAAAAAAA.mov',
    usage:" ",
	execute(message) {
        message.channel.send(`<@${message.author.id}>:`, {files: ["https://cdn.discordapp.com/attachments/716993263889809514/773235759112912906/AAAAAAAA.mov"]});
	},
};