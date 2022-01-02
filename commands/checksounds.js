const fs = require("fs");

module.exports = (msg) => {
    // TODO: Make this async
    let soundArr = fs.readdirSync("sounds");
    let reg = /^(.+)\.ogg/;
    let endMsg = "Available Sounds:\n";
    endMsg += soundArr.reduce((prev, curr) => prev += `${reg.exec(curr)[1]}\n`, "");

    msg.channel.send(endMsg);
}
