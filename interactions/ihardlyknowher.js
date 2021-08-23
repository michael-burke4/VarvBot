function getLastWordStripped(string) {
    let endString = '';
    let lastWord = string.substring(string.lastIndexOf(' ') + 1);
    // console.log(lastWordArray);
    if (lastWord.length < 4) {
        return null;
    }
    let matches = lastWord.match(/\w+/g);
    matches?.forEach(str => endString += str);
    if (endString.length < 4) {
        return null;
    }
    return endString;
}

module.exports = (msg) => {
    const lastWord = getLastWordStripped(msg.content);

    if (lastWord == null) {
        return;
    }

    if (lastWord.endsWith("er")) {
        msg.channel.send(`${lastWord.substring(0, lastWord.length - 2)} her? I hardly know her!`);
    }
}

