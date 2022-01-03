const fs = require("fs");

module.exports = {
    helpString: "ratio: calculates what percent of messages sent this month are from me vs from other people!",
    fun: (msg, tokens, client) => {
        // Funny joke: 1/10 calls to !ratio result in varvbot
        // trying to ratio the message sender.
        if (Math.random() < .1) {
            msg.channel.send("Ratio!");
            return;
        }

        fs.readFile("messagedata.json", "utf-8", (err, rawData) => {
            if (err) {
                console.log(err);
                return;
            }

            data = JSON.parse(rawData);
            const date = new Date();
            const dateStamp = `${date.getMonth()}m${date.getFullYear()}y`;
            if (data[dateStamp] == null) {
                msg.channel.send("Message data unavailable for this month");
                return;
            }
            msg.channel.send(`${data[dateStamp].bot} of the ${data[dateStamp].bot + data[dateStamp].users} messages this month were sent by ${client.user.username}!`);

        });
    }
}
