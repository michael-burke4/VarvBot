module.exports = (msg, client) => {
    const lowerCase = msg.content.toLowerCase();
    if (lowerCase.startsWith("what ")) {
        msg.channel.send(`Chicken Butt!`);
    }
}
