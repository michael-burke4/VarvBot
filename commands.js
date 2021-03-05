const fs = require("fs");
const config = require("./config.json");

const commandPath = config.commands_path;
const commands = {};

//automatically reads in all of the .js from the bot's designated 'commands' directory
//this can be customized in the config.json file.
fs.readdir(commandPath, (err, files) => {
    if (err) {
        console.log(err);
    }
    files.forEach(file => {
        commands[file.substring(0, file.length - 3)] = require(commandPath + "/" + file);
    });
});


const prefix = config.prefix;


module.exports = (msg, client) => {

    if (!msg.content.startsWith(prefix)) { return; }

    //varvbot supports a standard message prefix like '!', as well as more complex
    //strings like 'bot '. The latter example would fall apart if we were to naively
    //split the msg content by spaces without first removing the prefix from the equation.
    const tokens = msg.content.substring(prefix.length).split(" ");
    const command = tokens[0];

    if(commands[command]){
        commands[command](msg, tokens, client);
    }
}
