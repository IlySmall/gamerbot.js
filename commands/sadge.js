module.exports = {
	name: 'sadge',
    description: 'Posts sadge. Idea by Yadralf#0001',
    aliases: ['sad'],
    usage:" ",
	execute(message) {
        message.channel.send(`<@${message.author.id}> is sad`, {files: ["https://i.redd.it/39mpdazoupf51.png"]});
	},
};