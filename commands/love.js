//love calulator using rapid api

const unirest = require("unirest");
const { rapid_api_key } = require("../config.json")
const { MessageEmbed } = require("discord.js");


module.exports = (msg, tokens) => {
    if (tokens.length != 3) {
        msg.channel.send("Your command is formatted improperly!\nPlease use 'love (name) (name)'");
        return;
    }

    const req = unirest("GET", "https://love-calculator.p.rapidapi.com/getPercentage");

    req.query({
        "fname": tokens[1],
        "sname": tokens[2]
    });

    req.headers({
        "x-rapidapi-key": rapid_api_key,
        "x-rapidapi-host": "love-calculator.p.rapidapi.com",
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        let heart_img = "https://ih1.redbubble.net/image.1328908604.1387/st,small,507x507-pad,600x600,f8f8f8.jpg";
        if(parseInt(res.body.percentage) > 50){
            heart_img = "https://www.nicepng.com/png/detail/896-8968612_minecraft-heart-minecraft-health-bar-png.png";
        }

        const loveRating = new MessageEmbed()
                .setColor("FF69B4")
                .setTitle(`Love calculator for ${tokens[1]} and ${tokens[2]}`)
                .setThumbnail(heart_img)
                .addFields(
                    { name: "Love Level", value: res.body.percentage, inline: true },
                    { name: "Love Rating", value: res.body.result, inline: true },
                );
            msg.channel.send(loveRating);
    });


}