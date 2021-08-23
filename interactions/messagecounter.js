const fs = require("fs");

module.exports = async (msg, client) => {
    if (msg.guild.id != "110521954749960192") {
        return;
    }

    fs.readFile("data.json", "utf-8", (err, rawData) => {
        if (err) {
            console.log(err);
            return;
        }

        let data = JSON.parse(rawData);

        const date = new Date();
        const dateStamp = `${date.getMonth()}m${date.getFullYear()}y`;

        if (msg.author.id == client.user.id) {
            if (data.messages[dateStamp] == null) {
                data.messages[dateStamp] = {};
                data.messages[dateStamp].users = 0;
                data.messages[dateStamp].bot = 0;
            }
            data.messages[dateStamp].bot++;
            data.messages.lifetime.bot++;
        }
        else {
            //ugly double code will fix eventually
            if (data.messages[dateStamp] == null) {
                data.messages[dateStamp] = {};
                data.messages[dateStamp].users = 0;
                data.messages[dateStamp].bot = 0;
            }
            data.messages[dateStamp].users++;
            data.messages.lifetime.users++;
        }

        fs.writeFile("data.json", JSON.stringify(data, null, 4), err => {
            if (err) {
                console.log(err);
            }
        });

    });
}