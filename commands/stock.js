const unirest = require("unirest");
const {yahoo_key} = require("../config.json")
const {MessageEmbed} = require('discord.js');


module.exports = (msg, tokens) => {
    if(msg.channel.type === 'dm'){
        msg.channel.send("Sorry, but I will not perform this action in a DM!");
        return;
    }
    if(tokens.length != 2){
        msg.channel.send("Your command is formatted improperly!");
        return;
    }

    let req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary");

    req.query({
        "symbol": tokens[1],
        "region": "US"
    });
    
    req.headers({
        "x-rapidapi-key": yahoo_key,
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "useQueryString": true
    });

    req.end((res) => {
        if (res.error) throw new Error(res.error);
        
        try{
            const stockEmbed = new MessageEmbed()
            .setColor("5F02D2")
            .setTitle(res.body.price.longName)
            .setURL(`https://finance.yahoo.com/quote/${res.body.price.symbol}`)
            .setDescription(`${res.body.summaryProfile.longBusinessSummary.substring(0, 175)}...`)
            .setThumbnail('https://i.imgur.com/sj60vzD.png')
            .addFields(
                {name: "Stock Price", value: `$${res.body.price.regularMarketPrice.fmt}`, inline:true},
                {name: "Market Cap", value: res.body.price.marketCap.fmt, inline: true},
                {name: "Average Volume (10 day)", value: res.body.price.averageDailyVolume10Day.fmt, inline: true},
                {name: "Beta", value: res.body.defaultKeyStatistics.beta.fmt, inline:true}
                
            );
            msg.channel.send(stockEmbed);


        }catch(err){
            // if(err instanceof TypeError){
            //     msg.channel.send("Stock info could not be found! Sorry!");
            // }
            // else{
            console.log(err);
            // }
        }
    });

}