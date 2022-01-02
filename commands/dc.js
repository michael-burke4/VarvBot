module.exports = async (msg, tokens, client) => {
    client.dispatcher.destroy();
    client.connection.disconnect();
}
