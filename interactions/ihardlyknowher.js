const { enable_interactions } = require("../config.json");
const jokeRegex = /(\w\w+)er\W*$/g;

module.exports = (msg) => {
    if (!enable_interactions.hardlyknow) {
        return;
    }
    let regexMatches = jokeRegex.exec(msg.content);

    let jokeMatch = regexMatches?.[1];

    if (jokeMatch) {
        msg.channel.send(`${jokeMatch} her? I hardly know her!`)
    }

}
