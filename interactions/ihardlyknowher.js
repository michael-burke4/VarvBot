function getLastWordStripped(string) {
    let endString = '';
    let lastWordArray = string.substring(string.lastIndexOf(' ') + 1);
    lastWordArray.match(/\w+/g).forEach(str => endString += str);
    return endString;
}

module.exports = (msg) => {
    if (msg.content.length <= 2) {
        return;
    }
    console.log(msg.content);

    const lastWord = getLastWordStripped(msg.content);
    if (lastWord.endsWith("er")) {
        msg.channel.send(`${lastWord.substring(0, lastWord.length - 2)} her? I hardly know her!`);
    }
}

