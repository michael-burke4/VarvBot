const fs = require("fs");

module.exports = async (msg, client) => {
    if(msg.guild.id != "110521954749960192"){
        return;
    }
    
    fs.readFile("data.json", "utf-8", (err, rawData) => {
        if(err) {
            console.log(err);
            return;
        }

        data = JSON.parse(rawData);
        
        if(msg.author.id == client.user.id){
            data.messages.bot++;
        }
        else{
            data.messages.users++;
        }

        fs.writeFile("data.json", JSON.stringify(data, null, 4), err => {
            if(err){
                console.log(err);
            }
        });
    });
}