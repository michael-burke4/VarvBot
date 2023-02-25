const { enable_interactions } = require("../config.json");

module.exports = async (msg) => {
    if (!msg.content.includes("@someone") || !enable_interactions.atsomeone) {
        return;
    }

    const presences = msg.guild.presences.cache;
    // FIXME: not happy with this whole array solution, works for now.
    const presences_array = presences.map(x =>  [x.userId, x.status]).filter(user => user[1] == 'online');

    let replaced = msg.content;
    while (replaced.includes("@someone")) {
        replaced = replaced.replace("@someone", `<@${presences_array[Math.floor(presences_array.length * Math.random())][0]}>`);
    }
    msg.channel.send(replaced);
}