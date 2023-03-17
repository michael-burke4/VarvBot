const fs = require("fs");

module.exports = {
    description: "Checks available sounds for use with the 'sound' command!",
    fun: (msg) => {
        // TODO: Make this async
        let soundArr = fs.readdirSync("sounds");
        let reg = /^(.+)\.ogg/;
        let endMsg = "Available Sounds:\n";
        for (let sound of soundArr) {
                let name = reg.exec(sound)
                if (name !== null) {
                    endMsg += name[1] + "\n";
                }
        }
        msg.channel.send(endMsg);
    }
}
