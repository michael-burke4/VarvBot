const config = require("../config.json");
const adminRoles = config.admin_roles;

module.exports = async (msg, tokens) => {
    //currently only michael b is allowed to issue the !clean command, will eventually add support for any of the admin roles
    //specified in config.json to use the command
    if (msg.author.id == "213836206402699265") {
        let numToDelete = parseInt(tokens[1]);

        try {
            let fetched = await msg.channel.messages.fetch({ limit: numToDelete + 1 });
            msg.channel.bulkDelete(fetched);
        } catch (error) {
            console.log(error);
        }
    }
    else {
        msg.channel.send("You are not authorized to use this command!");
    }
}
