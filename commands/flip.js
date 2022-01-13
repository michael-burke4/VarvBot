//flip a coin

module.exports = {
    description: "Flip a coin!",
    fun: (msg) => {
        (Math.round(Math.random())) ? msg.channel.send("Tails!") : msg.channel.send("Heads!");
    }
}
