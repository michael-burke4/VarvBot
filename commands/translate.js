
const unirest = require("unirest");
const { rapid_api_key } = require("../config.json");


module.exports = (msg, tokens) => {
    const req = unirest("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");

    req.headers({
        "content-type": "application/x-www-form-urlencoded",
        "accept-encoding": "application/gzip",
        "x-rapidapi-key": rapid_api_key,
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "useQueryString": true
    });

    req.form({
        "q": "Hello, world!",
        "source": "en",
        "target": "es"
    });

    req.end(function (res) {
        if (res.error) throw new Error(res.error);
    
        console.log(res.body);
    });
}