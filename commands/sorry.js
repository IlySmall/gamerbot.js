module.exports = {
	name: 'sorry',
    description: 'Apologizes for the ping',
    aliases: ['soz'],
	execute(message) {
        message.channel.send(`${message.author.tag} is sorry about the ping`, {files: ["https://i.redd.it/e81flf21b5f51.png"]});
	},
};