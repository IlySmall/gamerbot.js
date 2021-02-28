function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

module.exports = {
	name: 'granja',
    description: 'haha horse',
	execute(message) {
        var array = ["https://cdn.discordapp.com/attachments/746506136810946570/773963641484607548/image0.png", "https://cdn.discordapp.com/attachments/746506136810946570/773192743156842506/image3.jpg","https://cdn.discordapp.com/attachments/746506136810946570/773192742867697664/image2.jpg","https://cdn.discordapp.com/attachments/746506136810946570/773192742602932234/image1.jpg","https://cdn.discordapp.com/attachments/746506136810946570/773192742264242176/image0.jpg", "https://cdn.discordapp.com/attachments/717188378105217045/773290369832058900/image0.png", "https://cdn.discordapp.com/attachments/746506136810946570/815604222938447922/JUAN_DEPOSITO.mp4"]
        message.channel.send(array[getRandomInt(array.length-1)]);
	},
};