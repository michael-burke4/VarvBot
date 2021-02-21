//remove a whole batch of messages from the text file the !clean command was called in.
//Varvbot will only obey if the user who calls !clean has one of the roles listen in
//the admin_roles array in config.json
const { admin_roles } = require("../config.json");

module.exports = async (msg, tokens) => {
    let allowed = false;
    const rolesCollection = msg.member.roles.cache;
    //turn the collection into an array, iterate over it searching to see if any role matches an admin_role.
    for (let role of rolesCollection.array()) {
        if (admin_roles.includes(role.name)) {
            allowed = true;
            break;
        }
    }

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
        //currently doesn't differentiate between not being able to delete a message because its too old,
        //not being able to delete a msg because he doesn't have message management permissions, just sends a
        //generic 'could not delete' message.
        console.log(error);
        msg.channel.send("Could not delete messages!");
    }

}
