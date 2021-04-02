module.exports = async (msg) => {
    const members = await msg.guild.members.fetch();
    const filteredMemberArray = members.array().filter(user => user.presence.status != "offline" && user.presence.status != "dnd");
    let replaced = msg.content;
    while (replaced.includes("@someone")) {
        replaced = replaced.replace("@someone", `${filteredMemberArray[Math.floor(filteredMemberArray.length * Math.random())].user}`);
    }
    msg.channel.send(replaced);
}