const { enable_interactions } = require("../config.json");
const fs = require("fs");

module.exports = async (msg, client) => {
    if (msg.guild.id != "110521954749960192" || !enable_interactions.hardlyknow) {
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
            data.lifetime = {};
        }
        if (data.lifetime[msg.author.id] == null) {
            data.lifetime[msg.author.id] = {
                username: msg.author.username,
                messages: 0,
            };
        }
        if (data.lifetime[msg.author.id].username != msg.author.username) {
            data.lifetime[msg.author.id].username = msg.author.username;

        }
        data.lifetime[msg.author.id].messages += 1;

        if (data[dateStamp] == null) {
            data[dateStamp] = {};
        }
        if (data[dateStamp][msg.author.id] == null) {
            data[dateStamp][msg.author.id] = {
                username: msg.author.username,
                messages: 0,
            };
        }
        if (data[dateStamp][msg.author.id].username != msg.author.username) {
            data[dateStamp][msg.author.id].username = msg.author.username;
        }
        data[dateStamp][msg.author.id].messages += 1;

        fs.writeFile(
            "messagedata.json",
            JSON.stringify(data, null, 4),
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    });
};
