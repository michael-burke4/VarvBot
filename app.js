const Discord = require("discord.js");


const interactionHandler = require("./interactionhandler.js");

require("dotenv").config();


let client = new Discord.Client();
// client.emojiVoteActive = false;
const key = process.env.BOT_KEY;

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`);
});

client.on("message", (message) => {

    interactionHandler(message, client);

});

client.login(key);
