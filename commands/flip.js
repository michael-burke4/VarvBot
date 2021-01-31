//flip a coin

module.exports = (msg) => {
    //if random() is > .5, should round to 1 and resolve to true and send "tails", else "heads"
    (Math.round(Math.random())) ? msg.channel.send("Tails!") : msg.channel.send("Heads!");
}