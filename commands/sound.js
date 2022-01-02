
module.exports = async (msg, tokens, client) => {

    if (!(msg.member.voice.channel)) {
        msg.channel.send("You are not in a voice channel!");
        return;
    }

    if(tokens.length != 2) {
        return;
    }

    client.connection = await msg.member.voice.channel.join();
    client.dispatcher = client.connection.play(`sounds/${tokens[1]}.ogg`);



    client.dispatcher.on("error", console.error);
}