const { Message } = require("discord.js")


module.exports = async (msg, tokens, client) => {
    if(msg.member.voice.channel){
        const connection = await msg.member.voice.channel.join(); 
    }
    else{
        msg.channel.send("You are not in a voice channel!");
    }
}
