const unirest = require("unirest");
const { MessageEmbed } = require("discord.js");


module.exports = (msg, tokens) =>{
    const address = "https://api.coingecko.com/api/v3/ping";

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
        console.log(res.body);


    });
}