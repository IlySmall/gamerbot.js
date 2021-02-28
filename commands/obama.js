function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

module.exports = {
	name: 'obama',
    description: 'Haha obama. Idea by MLG2460',
    usage:"mental breakdown",
	execute(message) {
        var array = ["https://cdn.discordapp.com/attachments/739921627558445206/779889456450502696/obama.gif", "https://cdn.discordapp.com/attachments/739921627558445206/779889786810925086/obama-prism-icegif.gif", "https://cdn.discordapp.com/attachments/739921627558445206/779892131358965810/Obamahedron.gif", "https://cdn.discordapp.com/attachments/739921627558445206/773289668723867690/obama-corn.gif"]
        message.channel.send(array[getRandomInt(array.length-1)]); 
	},
};