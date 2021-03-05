//Provides a bunch of data based off of a provided stock ticker. Uses the yahoo finance api on rapidapi.
const unirest = require("unirest");
const rapid_api_key  = process.env.RAPID_API_KEY;
const { MessageEmbed } = require("discord.js");


module.exports = (msg, tokens) => {
    //yahoo finance uses a freemium plan, so I want to be able to tell when people are spamming 
    //the stock command.
    if (msg.channel.type === 'dm') {
        msg.channel.send("Sorry, but I will not perform this action in a DM!");
        return;
    }
    if (tokens.length != 2) {
        msg.channel.send("Your command is formatted improperly!");
        return;
    }

    const req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary");
    req.query({
        "symbol": tokens[1],
        "region": "US"
    });
    req.headers({
        "x-rapidapi-key": rapid_api_key,
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "useQueryString": true
    });

    req.end((res) => {
        if (res.error) {
            console.log(res.error);
            msg.channel.send("Encountered unexpected error. Try again later. Sorry!");
            return;
        }

        try {
            const currencySymbol = res.body.price.currencySymbol;
            //varvbot finance logo.
            const logoURL = "https://i.imgur.com/sj60vzD.png";

            const stockEmbed = new MessageEmbed()
                .setColor("5F02D2")
                .setTitle(res.body.price.longName)
                .setURL(`https://finance.yahoo.com/quote/${res.body.price.symbol}`)
                .setDescription(`${res.body.summaryProfile.longBusinessSummary.substring(0, 175)}...`)
                .setThumbnail(logoURL)
                .addFields(
                    { name: "Stock Price", value: `${currencySymbol}${res.body.price.regularMarketPrice.fmt}`, inline: true },
                    { name: "Regular Market Change", value: res.body.price.regularMarketChangePercent.fmt, inline: true },
                    { name: "Market Cap", value: `${currencySymbol}${res.body.price.marketCap.fmt}`, inline: true },
                    { name: "Average Volume (10 day)", value: res.body.price.averageDailyVolume10Day.fmt, inline: true },
                    { name: "Beta", value: res.body.defaultKeyStatistics.beta.fmt, inline: true }
                );
            msg.channel.send(stockEmbed);
        } catch (err) {
            if (err instanceof TypeError) {
                console.log(err);
                msg.channel.send("Stock info could not be found! Sorry!");
            }
            else {
                console.log(err);
            }
        }
    });
}
