const jokeRegex = /(\w\w+)er\W*$/g;

module.exports = (msg) => {
    let regexMatches = jokeRegex.exec(msg.content);

    let jokeMatch = regexMatches?.[1];
    
    if(jokeMatch) {
        msg.channel.send(`${jokeMatch} her? I hardly know her!`)
    }
    
}
