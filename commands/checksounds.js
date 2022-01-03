const fs = require("fs");

module.exports = {
    helpString: "checksounds: Checks available sounds for use with the 'sound' command!",
    fun: (msg) => {
        // TODO: Make this async
        let soundArr = fs.readdirSync("sounds");
        let reg = /^(.+)\.ogg/;
        let endMsg = "Available Sounds:\n";
        endMsg += soundArr.reduce((prev, curr) => prev += `${reg.exec(curr)[1]}\n`, "");

        msg.channel.send(endMsg);
    }
}
