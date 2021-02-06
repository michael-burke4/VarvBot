const unirest = require("unirest");
const {yahoo_key} = require("../config.json")


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
            msg.channel.send(`${tokens[1].toUpperCase()} is currently valued at $${res.body.price.regularMarketPrice.fmt}/share`);
        }catch(err){
            if(err instanceof TypeError){
                msg.channel.send("Stock price could not be found! Sorry!");
            }
            else{
                console.log(err);
            }
        }
        
        
    });

}