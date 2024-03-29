const { admin_roles } = require("../config.json");

module.exports = {
    description: "Tells the bot to stop the current emoji vote (admin only)",
    fun: (msg, tokens, client) => {

        //gross long line sorry
        const allowed = msg.member.roles.cache.array().filter(role => admin_roles.includes(role.name)).length != 0;

        if (!allowed) {
            msg.channel.send("You are not authorized to use this command!");
            return;
        }

        clearTimeout(client.activeEmojiVote);
        client.activeEmojiVote = null;
    }
}
