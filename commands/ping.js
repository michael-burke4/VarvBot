//mostly used for testing. Good starting point if you're learning to program your own commands for varvbot!

module.exports = {
    helpString: "ping:                 pong!",
    fun: (msg) => {
        msg.reply("Pong!");
    }
}
