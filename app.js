const Discord = require("discord.js");
const config = require("./config.json");
const commandHandler = require("./commands.js");
const imjoke = require("./imjoke.js");


const client = new Discord.Client();
const key = config.key;

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`);
});

client.on("message", (message) => {
    if (config.options.enableImJoke) {
        imjoke(message, client);
    }
    commandHandler(message, client);
});

client.login(key);
