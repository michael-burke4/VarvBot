module.exports = (msg) => {
    if(msg.content.search(/(^what\s+|^what$)/) != -1) {
        msg.channel.send("Chicken butt!");
    }
}
