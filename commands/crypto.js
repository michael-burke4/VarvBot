//Allows the user to request some market data concerning a cryptocurrency 
const unirest = require("unirest");
const { MessageEmbed } = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
    helpString: "crypto {coin}: Check the price of a cryptocurrency!",
    fun: (msg, tokens) => {
        if (tokens.length < 2) {
            msg.channel.send("Formatted improperly, try again!");
            return;
        }


        //coins like 'bitcoin cash' need to be caught as well, every token after ${prefix}crypto is turned into
        //a single block with spaces replaced by -'s.
        const strippedMessage = msg.content.toLowerCase().substr(prefix.length + "crypto ".length);
        const coinString = strippedMessage.replace(/\s/g, "-");

        //this api doesn't need a key! Very cool.
        const address = `https://api.coingecko.com/api/v3/coins/${coinString}`;

        const req = unirest("GET", address);
        req.headers({
            "accept": "application/json"
        });

        req.end((res) => {
            if (res.error) {
                console.log(res.error);
                msg.channel.send("Encountered unexpected error. Try again later. Sorry!");
                return;
            }
            const coinEmbed = new MessageEmbed()
                .setTitle(res.body.name)
                .setColor("FCBA03")
                .setThumbnail(res.body.image.small)
                .addFields(
                    { name: "Current Price", value: `$${res.body.market_data.current_price.usd}`, inline: true },
                    { name: "All Time High", value: `$${res.body.market_data.ath.usd}`, inline: true },
                    { name: "24 Hour High", value: `$${res.body.market_data.high_24h.usd}`, inline: true },
                    { name: "24 Hour Low", value: `$${res.body.market_data.low_24h.usd}`, inline: true }
                );
            msg.channel.send(coinEmbed);
        });
    }
}
