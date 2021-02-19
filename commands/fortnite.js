const { Message } = require("discord.js");

module.exports = async (msg, tokens, client) => {
    if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play("fortnite.mp3");


        dispatcher.on("finish", () => {
            dispatcher.destroy();
            connection.disconnect();
        });

        // Always remember to handle errors appropriately!
        dispatcher.on("error", console.error);

    }
    else {
        msg.channel.send("You are not in a voice channel!");
    }
}
