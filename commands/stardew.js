const fs = require("fs");
const execSync = require('child_process').execSync;

module.exports = {
    description: "Gives the stardew valley invite code!",
    fun: (msg, tokens, client) => {

        let stardew = process.env.STARDEW_PATH;
        let appID = "413150"; // The Steam AppID for Stardew
        let proc = 'ps aux | grep Stardew'; // The Linux command to check for a Stardew process

        const output = execSync(proc, { encoding: 'utf-8' });

        let serverIsUp = output.includes(appID);

        if(!serverIsUp){
            msg.channel.send(`The Stardew Valley server is currently down`);
            return;
        }

        fs.readFile(stardew, "utf-8", (err, rawData) => {
            if (err) {
                msg.channel.send("Invite code has not been generated/configured!");
                console.log(err);
                return;
            }
            let invite = String(rawData).trim();
            if (invite == null) {
                msg.channel.send("Invite code unavailable!");
                return;
            }
            msg.channel.send(`The server is up! Join the BGC Stardew server with invite code: ${invite}`);
        });

    }
}
