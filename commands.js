const fs = require('fs');
const config = require('./config.json');

const commandPath = config.commands_path;
const commands = {};

//automatically reads in all of the .js from the bot's designated 'commands' directory
//this can be customized in the config.json file.
fs.readdir(commandPath, (err, files) => {
    if(err){
        console.log(err);
    }
    files.forEach(file => {
        commands[file.substring(0, file.length - 3)] = require(commandPath + "/" + file);
    });
});


const prefix = config.prefix;


module.exports =  (msg, client) => {
    //a command like !roll 5 is split into an array with the following strings as 'tokens' to help execute commands
    //["!roll", "5"]
    const tokens = msg.content.split(" ");
    
    if(tokens[0].startsWith(prefix)){
        //the command will be element 0 of the tokens array, excluding the specified prefix.
        //note: this DOES mean varvbot supports more complex prefixes like "!!" or "varvbot, "
        //if you want a space to be part of the prefix, though, make sure it is set up like that in config.json!!!!
        const command = tokens[0].substring(prefix.length);
        console.log("Recieved command: " + command);
        try{
            commands[command](msg, tokens, client);
        }
        //currently logging any unrecognized commands as errors. This is ugly and I might want to change it later.
        catch(error){
            console.log(error);
        }
    }
}