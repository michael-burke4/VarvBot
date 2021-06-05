const DAY_IN_MS = 86400000;
const TEN_SEC = 10000;

const vote_interval = DAY_IN_MS;

module.exports = async (msg, client) => {
    if (msg.author.id == "370738893903101954") {
        return;
    }

    if (client.emojiVoteActive) {
        msg.delete();
        msg.author.send("There is currently an active emoji vote, please wait to send any messages!");
        return;
    }

    if (msg.attachments.size != 1) {
        return;
    }

    client.emojiVoteActive = true;
    msg.react("✅");
    msg.react("❌");
    msg.channel.send("@everyone do your civic duty and vote on this submission!");

    //using setTimeout here FEELS horrible
    setTimeout(async () => {
        let checks = msg.reactions.cache.find(emoji => emoji.emoji.name == '✅').count - 1;
        let xs = msg.reactions.cache.find(emoji => emoji.emoji.name == '❌').count - 1;
        let passed = xs + checks > 5 && checks > (2 / 3) * (xs + checks)

        if (checks > xs + checks * (2 / 3) && checks + xs > 4) {
            msg.channel.send(`${msg.author}'s submission has passed with ${checks} ✅ votes and ${xs} ❌ votes!`);
            msg.channel.send("@everyone React to THIS message with the emoji you'd like to see removed!");

            setTimeout(async () => {

                const removeVoteMessage = [... await msg.channel.messages.fetch({ limit: 1 })][0];
                const emojiCache = removeVoteMessage[1].reactions.cache;
                const mostCommonArray = findMostCommonReactions(emojiCache);
                const idToDelete = randElement(mostCommonArray);

                const emojiToDelete = client.emojis.cache.get(idToDelete)
                if (mostCommonArray.length > 1) {
                    msg.channel.send("There is a tie! A loser will be randomly chosen!");
                }
                msg.channel.send(`The vote is complete! <:${emojiToDelete.name}:${emojiToDelete.id}> will be replaced!`);

                client.emojiVoteActive = false;
            }, vote_interval);
        }
        else {
            msg.channel.send(`${msg.author}'s submission has NOT passed! The submission recieved ${checks} ✅ votes and ${xs} ❌ votes!`);
            client.emojiVoteActive = false;
        }
    }, vote_interval);
}

function findMostCommonReactions(emojiCache) {
    let mostCommon = [];
    let commonestMagnitude = 0;
    emojiCache.forEach(element => {
        if (element._emoji.id != null) {

            if (element.count > commonestMagnitude) {
                mostCommon = [];
                mostCommon.push(element._emoji.id);
                commonestMagnitude = element.count;
            }
            else if (element.count == commonestMagnitude) {
                mostCommon.push(element._emoji.id);
            }
        }
    });
    return mostCommon;
}

function randElement(array) {
    return array[Math.floor(array.length * Math.random())];
}