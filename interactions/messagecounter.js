const fs = require("fs");

module.exports = async (msg, client) => {
    if (msg.guild.id != "110521954749960192") {
        return;
    }

    fs.readFile("messagedata.json", "utf-8", (err, rawData) => {
        if (err) {
            console.log(err);
            return;
        }

        let data = JSON.parse(rawData);

        const date = new Date();
        const dateStamp = `${date.getMonth()}m${date.getFullYear()}y`;
        if (data.lifetime == null) {
            data.lifetime = {bot: 0, users: 0};
        }


        if (msg.author.id == client.user.id) {
            if (data[dateStamp] == null) {
                data[dateStamp] = {};
                data[dateStamp].users = 0;
                data[dateStamp].bot = 0;
            }
            data[dateStamp].bot++;
            data.lifetime.bot++;
        }
        else {
            if (data[dateStamp] == null) {
                data[dateStamp] = {};
                data[dateStamp].users = 0;
                data[dateStamp].bot = 0;
            }
            data[dateStamp].users++;
            data.lifetime.users++;
        }

        fs.writeFile("messagedata.json", JSON.stringify(data, null, 4), err => {
            if (err) {
                console.log(err);
            }
        });

    });
}