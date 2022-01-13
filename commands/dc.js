module.exports = {
    description: "Disconnects the bot from the current voice channel!",
    fun: async (msg, tokens, client) => {
        client.dispatcher.destroy();
        client.connection.disconnect();
    }
}
