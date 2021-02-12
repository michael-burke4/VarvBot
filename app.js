const Discord = require("discord.js");
const config = require("./config.json");
const commandHandler = require("./commands.js");
const imjoke = require("./imjoke.js");


const client = new Discord.Client();
const key = config.key;

//logs to console when logged in successfully
client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
});

//handles all of the logic whenever a message is recieved.
//if the message starts with I'm/I am/Im it does the classic dad joke
//if the message starts with the prefix defined in config.json it tries to execute the specified command
client.on('message', (message) => {
    if(config.options.enableImJoke){
        imjoke(message);
    }
    commandHandler(message, client);
});

client.login(key);
