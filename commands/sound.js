
module.exports = async (msg, tokens, client) => {

    if (!(msg.member.voice.channel)) {
        msg.channel.send("You are not in a voice channel!");
        return;
    }

    if(tokens.length != 2) {
        return;
    }

    const connection = await msg.member.voice.channel.join();
    const dispatcher = connection.play(`sounds/${tokens[1]}.ogg`);


    dispatcher.on("finish", () => {
        dispatcher.destroy();
        connection.disconnect();
    });

    dispatcher.on("error", console.error);
}
