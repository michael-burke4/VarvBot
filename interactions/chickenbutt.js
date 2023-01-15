const { enable_interactions } = require("../config.json");

module.exports = (msg) => {
    if (!enable_interactions.chickenbutt) {
        return;
    }
    msg.content.toLowerCase().search(/(^what(\s|$))/) == -1 ? 0 : msg.channel.send("Chicken butt!");
}
