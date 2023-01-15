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

        let fieldToUpdate = (msg.author.id == client.user.id) ? "bot" : "users";
        if (data[dateStamp] == null) {
            data[dateStamp] = {bot: 0, users: 0};
        }
        data[dateStamp][fieldToUpdate] += 1;
        data["lifetime"][fieldToUpdate] += 1;
        fs.writeFile("messagedata.json", JSON.stringify(data, null, 4), err => {
            if (err) {
                console.log(err);
            }
        });

    });
}