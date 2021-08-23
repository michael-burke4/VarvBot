const fs = require("fs");

module.exports = (msg) => {
    fs.readFile("data.json", "utf-8", (err, rawData) => {
        if(err) {
            console.log(err);
            return;
        }

        data = JSON.parse(rawData);
        msg.channel.send(`${data.messages.bot} of the last ${data.messages.bot + data.messages.users} messages have been sent by VarvBot!`);

    });
}