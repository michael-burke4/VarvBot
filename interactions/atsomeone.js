const { enable_interactions } = require("../config.json");

module.exports = async (msg) => {
    if (!msg.content.includes("@someone") || !enable_interactions.atsomeone) {
        return;
    }

    const members = await msg.guild.members.fetch();
    // FIXME: members.array() not a function.
    // prob some API change w/ online members.
    const filteredMemberArray = members.array().filter(user => user.presence.status != "offline" && user.presence.status != "dnd");
    let replaced = msg.content;
    while (replaced.includes("@someone")) {
        replaced = replaced.replace("@someone", `${filteredMemberArray[Math.floor(filteredMemberArray.length * Math.random())].user}`);
    }
    msg.channel.send(replaced);
}