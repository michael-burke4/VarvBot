const fs = require("fs");

module.exports = {
    description: "Gives the stardew valley invite code!",
    fun: (msg, tokens, client) => {

        let stardew = process.env.STARDEW_PATH;
        let serverIsUp = false;
        let appID = "413150";

        exec('ps aux | grep Stardew',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                return;
            }
            serverIsUp = stdout.includs(appId);
        });

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
            return;
        });

        msg.channel.send('Uh oh, something went wrong');
    }
}
