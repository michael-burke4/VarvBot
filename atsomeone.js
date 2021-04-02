module.exports = (msg) => {
    const memberArray = msg.channel.guild.members.cache.array();
    let replaced = msg.content;
    while(replaced.includes("@someone")){
        replaced = replaced.replace("@someone", `${memberArray[Math.floor(memberArray.length * Math.random())].user}`);
    }
    msg.channel.send(replaced);
}