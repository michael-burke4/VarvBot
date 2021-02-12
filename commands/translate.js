
const unirest = require("unirest");
const { rapid_api_key } = require("../config.json");
const { languages } = require("../data.json");
const { MessageEmbed, Message } = require("discord.js");

module.exports = (msg, tokens) => {
    //not going to let people use this feature in dms
    if (msg.channel.type === 'dm') {
        msg.channel.send("Sorry, but I will not perform this action in a DM!");
        return;
    }

    //The msg string is going to need at least 4 tokens to be formatted properly.
    if (tokens.length < 4) {
        msg.channel.send("Message formatted improperly! Try again! (use !help for guidance)");
        return;
    }

    const languageFrom = tokens[1];
    const languageTo = tokens[2];
    //if varvbot doesn't recognize the given language(s), don't bother with an api call, tell the user about it.
    if (!(languages.includes(languageTo) && languages.includes(languageFrom))) {
        msg.channel.send("One or more of the languages you've chosen is unsupported, try again!");
        return;
    }


    const openParenIndex = msg.content.search(/\(/g);
    const closeParenIndex = msg.content.search(/\)/g);
    //open paren has to be left of the close paren.
    if (openParenIndex == -1 || closeParenIndex == -1 || !(openParenIndex + 1 < closeParenIndex)) {
        msg.channel.send("Message formatted improperly! Try again! (use !help for guidance)");
        return;
    }

    //extract the string from between parens.
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
        "source": languageFrom,
        "target": languageTo
    });

    req.end(function (res) {
        if (res.error) throw new Error(res.error);


        const logoURL = "https://i.imgur.com/MBTWOxC.png";
        const translatedText = res.body.data.translations[0].translatedText;

        const translateEmbed = new MessageEmbed()
            .setColor("377DF2")
            .setTitle(`Translation from ${languageFrom} to ${languageTo}`)
            .setThumbnail(logoURL)
            .addField("Source Message", sourceString, false)
            .addField("Translated Message", translatedText, false);

        msg.channel.send(translateEmbed);
    });
}