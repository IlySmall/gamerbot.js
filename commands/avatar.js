module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	aliases: ['icon', 'pfp'],
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })}`;
		});

		message.channel.send({content: avatarList.toString()});
	},
};