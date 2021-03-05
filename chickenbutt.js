module.exports = (msg, client) => {
    const lowerCase = msg.content.toLowerCase();
    if (lowerCase.startsWith("what ") || lowerCase == "what") {
        msg.channel.send("Chicken Butt!");
    }
}
