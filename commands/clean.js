//remove a whole batch of messages from the text file the !clean command was called in.
//Varvbot will only obey if the user who calls !clean has one of the roles listen in
//the admin_roles array in config.json
const { admin_roles } = require("../config.json");

module.exports = async (msg, tokens) => {
    const rolesArray = msg.member.roles.cache.array();
    const allowed = rolesArray.filter(role => admin_roles.includes(role.name)).length != 0;

    if (!allowed) {
        msg.channel.send("You are not authorized to use this command!");
        return;
    }

    if (tokens.length != 2) {
        msg.channel.send("Improperly formatted !clean request!");
        return;
    }

    const numToDelete = parseInt(tokens[1]);
    if (isNaN(numToDelete) || numToDelete < 0) {
        msg.channel.send("Invalid removal amount!");
        return;
    }

    try {
        const fetched = await msg.channel.messages.fetch({ limit: numToDelete + 1 });
        msg.channel.bulkDelete(fetched);
    } catch (error) {
        console.log(error);
        msg.channel.send("Could not delete messages!");
    }

}
