
const unirest = require("unirest");
const { rapid_api_key } = require("../config.json");


module.exports = (msg, tokens) => {

    const openParenIndex = msg.content.search(/\(/g);
    const closeParenIndex = msg.content.search(/\)/g);
    if(!(openParenIndex + 1 < closeParenIndex)){
        msg.channel.send("Message formatted improperly! Try again!");
        return;
    }

    const sourceString = msg.content.substring(openParenIndex + 1, closeParenIndex);


    const req = unirest("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
    req.headers({
        "content-type": "application/x-www-form-urlencoded",
        "accept-encoding": "application/gzip",
        "x-rapidapi-key": rapid_api_key,
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "useQueryString": true
    });

    req.form({
        "q": sourceString,
        "source": "en",
        "target": "es"
    });

    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        const translatedText = res.body.data.translations[0].translatedText;

        msg.channel.send(translatedText);
    });
}