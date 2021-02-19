const { admin_roles } = require("../config.json");

module.exports = async (msg, tokens) => {
    let allowed = false;
    const rolesCollection = msg.member.roles.cache;
    for (let role of rolesCollection.array()) {
        if (admin_roles.includes(role.name)) {
            allowed = true;
        }
    }

    // User permission/role check
    if (!allowed) {
        msg.channel.send("You are not authorized to use this command!");
        return;
    }

    //!clean formatting check
    if (tokens.length != 2) {
        msg.channel.send("Improperly formatted !clean request!");
        return;
    }

    //Positive number check
    let numToDelete = parseInt(tokens[1]);
    if (isNaN(numToDelete) || numToDelete < 0) {
        msg.channel.send("Invalid removal amount!");
        return;
    }

    try {
        let fetched = await msg.channel.messages.fetch({ limit: numToDelete + 1 });
        msg.channel.bulkDelete(fetched);
    } catch (error) {
        console.log(error);
        msg.channel.send("Could not delete messages!");
    }

}
