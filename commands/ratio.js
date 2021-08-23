const fs = require("fs");

module.exports = (msg, tokens, client) => {
    fs.readFile("messagedata.json", "utf-8", (err, rawData) => {
        if (err) {
            console.log(err);
            return;
        }

        data = JSON.parse(rawData);
        const date = new Date();
        const dateStamp = `${date.getMonth()}m${date.getFullYear()}y`;
        if(data[dateStamp] == null) {
            msg.channel.send("Message data unavailable for this month");
            return;
        }
        msg.channel.send(`${data[dateStamp].bot} of the last ${data[dateStamp].bot + data[dateStamp].users} messages this month have been sent by ${client.user.username}!`);

    });
}