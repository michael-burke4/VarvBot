module.exports = (msg) => {
    const memberArray = msg.channel.guild.members.cache.array();
    const randIndex = Math.floor(memberArray.length * Math.random())
    msg.channel.send(`${memberArray[randIndex].user}`);
    // msg.channel.send(idArray[Math.floor(idArray.length * Math.random())])
}