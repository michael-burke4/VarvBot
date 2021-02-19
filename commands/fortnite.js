//Joins the voice channel the calling member is in and plays the fortnite.mp3 file.
module.exports = async (msg, tokens, client) => {

    if (!(msg.member.voice.channel)) {
        msg.channel.send("You are not in a voice channel!");
        return;
    }

    const connection = await msg.member.voice.channel.join();
    const dispatcher = connection.play("fortnite.mp3");


    dispatcher.on("finish", () => {
        dispatcher.destroy();
        connection.disconnect();
    });

    dispatcher.on("error", console.error);
}
