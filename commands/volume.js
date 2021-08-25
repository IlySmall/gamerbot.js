;module.exports = {
	name: 'volume',
    description: 'music',
    usage:" ",
    aliases: ['v', 'vol'],
	execute(message,args,b,c,distube) {
        if(parseFloat(args[0])<=100&&parseFloat(args[0])>0){
            distube.setVolume(message, args[0])
            message.channel.send("Volume set to `"+args[0]+"%`");
        }
        else{
            message.channel.send("Please set a valid volume, you dipshit.")
        }
	},
};