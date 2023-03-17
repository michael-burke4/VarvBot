const sound = require('./sound.js');

module.exports = {
    description: "Disconnects the bot from the current voice channel!",
    fun: async (msg, tokens, client) => {
        // client.dispatcher.destroy();
        // client.connection.disconnect();
		// client.dispatcher = null;
		// client.connection = null;
        sound.dc();
    }
}
