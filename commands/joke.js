let { jokes } = require("../data.json");

//varvbot is simply too funny
module.exports = {
    helpString: "I tell one of my hilarious jokes!",
    fun: (msg) => {
        let index = Math.floor(jokes.length * Math.random());
        msg.channel.send(jokes[index]);
    }
}
