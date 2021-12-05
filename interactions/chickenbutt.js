module.exports = (msg) => {
    msg.content.toLowerCase().search(/(^what(\s|$))/) == -1 ? 0 : msg.channel.send("Chicken butt!");
}
