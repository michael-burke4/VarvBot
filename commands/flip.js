//flip a coin

module.exports = (msg) => {
    (Math.round(Math.random())) ? msg.channel.send("Tails!") : msg.channel.send("Heads!");
}
