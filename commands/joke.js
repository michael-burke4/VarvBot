let fs = require('fs');
let rawData = fs.readFileSync("data.json");

//varvbot is simply too funny
module.exports = (msg) => {
    let data = JSON.parse(rawData);
    let index = Math.floor(data.jokes.length * Math.random());
    msg.channel.send(data.jokes[index]);
}
