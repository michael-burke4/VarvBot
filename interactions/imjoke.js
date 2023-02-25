const config = require("../config.json");
const { enable_interactions } = require("../config.json");

//if the message starts with some variant of I am, followed by some string "...", varvbot will respond by saying
// Hi "...", I'm VarvBot!
module.exports = (msg, client) => {
    if (!enable_interactions.hardlyknow) {
        return;
    }
    const jokeString = (/^(?:I|i)(?: (?:a|A)(?:M|m)|(?:M|m|'m|'M|’m|’M)) +(.+)$/g).exec(msg.content)?.[1];
    jokeString != null ? msg.channel.send(`Hi ${jokeString}, I'm VarvBot!`) : 0;
}
