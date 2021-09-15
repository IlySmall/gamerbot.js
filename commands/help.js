const {
	Util: { splitMessage },
  } = require("discord.js");
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		var {prefix} = require('../cfg.json');
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('all the current commands you dumb shit:');
			data.push(commands.map(command =>"***"+ command.name + "***: "+command.description).join('\n '));
			data.push(`\nYou can send \`${prefix}help [command name]\` if you're retarded and need more help!`);
			var splitData=splitMessage(data.join("\n"),{maxLength = 2000, char = '\n', prepend = '', append = ''})
			return message.author.send(splitData)
				.then(() => {
					if (message.channel.type === 'DM') return;
					message.reply('I\'ve sent you a DM with all my commands, fuckface!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you, dumb shit!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (name === "nigger" || name === "nigga" || name === "нигга" || name === "ниггер" || name === "にっが" || name === "ニッガ" || name === "ﾆｯｶﾞ" || name === "黑鬼") {
			return message.reply('I\'m not black you dumb shit!');
		}
		if (!command) {
			return message.reply('that\'s not a valid command, cunt!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send({content:data.join("\n")});
	},
};