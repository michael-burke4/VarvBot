const DAY_IN_MS = 86400000;
const TEN_SEC = 10000; //ten seconds used for debugging.

module.exports = async (msg, client) => {
    msg.react("✅");
    msg.react("❌");
    msg.channel.send("@everyone do your civic duty and vote on this submission!");  
    client.emojiVoteActive = true;
    const vote_interval = TEN_SEC;

    setTimeout(async () => {
        let checks = msg.reactions.cache.find(emoji => emoji.emoji.name == '✅').count - 1; 
        let xs = msg.reactions.cache.find(emoji => emoji.emoji.name == '❌').count - 1;
        let passed = xs + checks > 5 && checks > (2 / 3) * (xs + checks)
        
        if(checks > xs){
            msg.channel.send(`${msg.author}'s submission has passed with ${checks} ✅ votes and ${xs} ❌ votes!`);
            msg.channel.send("@everyone React to THIS message with the emoji you'd like to see removed!");
            
            

            setTimeout(async () => {
                const fetched = [... await msg.channel.messages.fetch(6)];
                let messages = [];
                fetched.forEach(msg => messages.push(msg[1]));
                console.log(fetched);
                
                // const removeVoteMessage = fetched.filter(message => message[1].content.includes("React to THIS"));
                
                // console.log(removeVoteMessage[0].content);

                // fetched.forEach(message => console.log(message[1].content));
            }, TEN_SEC / 3);

            
            
            setTimeout( () => {
                msg.channel.send("The vote is complete!");
                
            }, vote_interval);
        }
        else{
            msg.channel.send(`${msg.author}'s submission has NOT passed! The submission recieved ${checks} ✅ votes and ${xs} ❌ votes!`);
            client.emojiVoteActive = false;
        }
    }, vote_interval);
}