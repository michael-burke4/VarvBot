module.exports = async (msg) => {
    msg.react("✅");
    msg.react("❌");
    setTimeout( () => {
        let checks = msg.reactions.cache.find(emoji => emoji.emoji.name == '✅').count - 1; 
        let xs = msg.reactions.cache.find(emoji => emoji.emoji.name == '❌').count - 1;
        if(xs + checks > 5 && checks > (2 / 3) * (xs + checks)){
            msg.channel.send(`${msg.author}'s submission has passed!`)
        }
        else{
            msg.channel.send(`${msg.author}'s submission has NOT passed!`)
        }
    }, 5000);
}