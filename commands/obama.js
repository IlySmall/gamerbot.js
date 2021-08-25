function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

module.exports = {
	name: 'obama',
    description: 'Haha obama. Idea by MLG2460',
    usage:"mental breakdown",
	execute(message) {
        var array = ["https://cdn.discordapp.com/attachments/739921627558445206/779889456450502696/obama.gif", "https://static.wikia.nocookie.net/fandomium/images/0/0c/Obomba.gif/revision/latest?cb=20191122172620", "https://cdn.discordapp.com/attachments/739921627558445206/824436485948047360/13e.png", "https://i.kym-cdn.com/photos/images/original/001/548/017/98a.gif", "https://i.kym-cdn.com/photos/images/original/001/548/021/341.gif"]
        message.channel.send(array[getRandomInt(array.length-1)]); 
	},
};