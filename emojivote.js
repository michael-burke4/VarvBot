const DAY_IN_MS = 86400000;
const TEN_SEC = 10000;

module.exports = async (msg) => {
    msg.react("✅");
    msg.react("❌");
    msg.channel.send("@everyone do your civic duty and vote on this submission!");  
    setTimeout(async () => {
        let checks = msg.reactions.cache.find(emoji => emoji.emoji.name == '✅').count - 1; 
        let xs = msg.reactions.cache.find(emoji => emoji.emoji.name == '❌').count - 1;
        let passed = xs + checks > 5 && checks > (2 / 3) * (xs + checks)
        const vote_interval = TEN_SEC;
        
        if(checks > xs){
            msg.channel.send(`${msg.author}'s submission has passed with ${checks} ✅ votes and ${xs} ❌ votes!`);
            msg.channel.send("@everyone React to THIS message with the emoji you'd like to see removed!");
            let filtered;
            
            const fetched = await msg.channel.messages.fetch(6);
            filtered = fetched.filter(msg => msg.contents === "@everyone React to THIS message with the emoji you'd like to see removed!");
            fetched.foreach(msg => console.log(msg.contents));
            console.log(filtered);
            
            
            setTimeout( () => {
                msg.channel.send("The vote is complete!");
                
            }, vote_interval);
        }
        else{
            msg.channel.send(`${msg.author}'s submission has NOT passed! The submission recieved ${checks} ✅ votes and ${xs} ❌ votes!`);
        }
    }, vote_interval);
}