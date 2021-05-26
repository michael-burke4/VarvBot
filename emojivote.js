module.exports = async (msg) => {
    msg.react("✅");
    msg.react("❌");
    msg.channel.send("@everyone do your civic duty and vote on this submission!");  
    setTimeout( () => {
        let checks = msg.reactions.cache.find(emoji => emoji.emoji.name == '✅').count - 1; 
        let xs = msg.reactions.cache.find(emoji => emoji.emoji.name == '❌').count - 1;
        let passed = xs + checks > 5 && checks > (2 / 3) * (xs + checks)
        // if(){
        if(checks > xs){
            msg.channel.send(`${msg.author}'s submission has passed!`)
            msg.channel.send("@everyone React to THIS message with the emoji you'd like to see removed!");
            setTimeout( () => {
                msg.channel.send("The vote is complete!");
            }, 86400000);
        }
        else{
            msg.channel.send(`${msg.author}'s submission has NOT passed!`)
        }
    }, 86400000);
}