const fs = require("fs");

module.exports = {
    description: "Gives the stardew valley invite code!",
    fun: (msg, tokens, client) => {

        let stardew = process.env.STARDEW_PATH;

        fs.readFile(stardew, "utf-8", (err, rawData) => {
            if (err) {
                msg.channel.send("Invite code has not been generated/configured!");
                console.log(err);
                return;
            }
            let invite = String.parse(rawData);
            if (invite == null) {
                msg.channel.send("Invite code unavailable!");
                return;
            }
            msg.channel.send(`Join the BGC Stardew Server with invite code: ${invite}!`);

        });
    }
}
