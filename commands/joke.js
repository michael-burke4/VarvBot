let { jokes } = require("../data.json");

//varvbot is simply too funny
module.exports = (msg) => {
    let index = Math.floor(jokes.length * Math.random());
    msg.channel.send(jokes[index]);
}
