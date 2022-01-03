module.exports = {
    helpString: "dc:                   disconnects the bot from the current voice channel!",
    fun: async (msg, tokens, client) => {
        client.dispatcher.destroy();
        client.connection.disconnect();
    }
}
