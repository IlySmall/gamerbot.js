module.exports = {
    name: 'reload',
    description: 'Reloads a command (permission locked)',
    permissions:"admin global",
    execute(message, args) {
        if (!args.length) return message.channel.send(`give me a command, ${message.author}, you fucking retard!`);
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`\`${commandName}\` is not real, ${message.author} you fucking cunt!`);

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			console.error(error);
			message.channel.send(`error you dumb shit \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};