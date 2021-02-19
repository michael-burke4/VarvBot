module.exports = async (msg, tokens, client) => {
    if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
    }
}