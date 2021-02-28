module.exports = {
	name: 'doxme',
	description: 'Display info about yourself.',
	execute(message) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}\nAccount created: ${message.author.createdAt}\nAvatar URL: ${message.author.avatarURL()}`);
	},
};