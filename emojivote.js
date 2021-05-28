const DAY_IN_MS = 86400000;
const TEN_SEC = 10000; //ten seconds used for debugging.

module.exports = async (msg, client) => {
    if(msg.author.id == "370738893903101954"){
        return;
    }

    if(client.emojiVoteActive){
        msg.delete();
        msg.author.send("There is currently an active emoji vote, please wait to send any messages!");
        return;
    }

    if(msg.attachments.size != 1){
        return;
    }

    client.emojiVoteActive = true;
    msg.react("✅");
    msg.react("❌");
    msg.channel.send("@everyone do your civic duty and vote on this submission!");  
    
    const vote_interval = TEN_SEC;

    setTimeout(async () => {
        let checks = msg.reactions.cache.find(emoji => emoji.emoji.name == '✅').count - 1; 
        let xs = msg.reactions.cache.find(emoji => emoji.emoji.name == '❌').count - 1;
        let passed = xs + checks > 5 && checks > (2 / 3) * (xs + checks)
        
        if(checks > xs){
            msg.channel.send(`${msg.author}'s submission has passed with ${checks} ✅ votes and ${xs} ❌ votes!`);
            msg.channel.send("@everyone React to THIS message with the emoji you'd like to see removed!");

            setTimeout( () => {
                msg.channel.send("The vote is complete!");
                client.emojiVoteActive = false;
            }, vote_interval);
        }
        else{
            msg.channel.send(`${msg.author}'s submission has NOT passed! The submission recieved ${checks} ✅ votes and ${xs} ❌ votes!`);
            client.emojiVoteActive = false;
        }
    }, vote_interval);
}