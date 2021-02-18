const unirest = require("unirest");
const { MessageEmbed } = require("discord.js");


module.exports = (msg, tokens) =>{
    if(tokens.length < 2){
        msg.channel.send("Formatted improperly, try again!");
        return;
    }
    const cmdLen = "!crypto ".length;
    //coins like 'bitcoin cash' need to be caught as well, every token after !crypto is turned into
    //a single block with spaced replaced by -'s.
    const coinString = msg.content.toLowerCase().substr(cmdLen).replace(/\ /g, "-");
    console.log(coinString);

    const address = `https://api.coingecko.com/api/v3/coins/${coinString}`;

    const req = unirest("GET", address);

    req.headers({
        "accept": "application/json" 
    });

    req.end((res) => {
        if (res.error) {
            console.log(res.eror);
            msg.channel.send("Encountered unexpected error. Try again later. Sorry!");
            return;
        }
        const coinEmbed = new MessageEmbed()
                .setColor("FCBA03")
                // .setTitle(res.body.price.longName)
                // .setURL(`https://finance.yahoo.com/quote/${res.body.price.symbol}`)
                // .setDescription(`${res.body.summaryProfile.longBusinessSummary.substring(0, 175)}...`)
                .setThumbnail(res.body.image.small)
                .addFields(
                    { name: "Current Price", value: `$${res.body.market_data.current_price.usd}`, inline: true });
        msg.channel.send(coinEmbed);

    });
}