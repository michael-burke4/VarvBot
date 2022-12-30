const Discord = require("discord.js");
const interactionHandler = require("./interactionhandler.js");
const typingHandler = require("./typinghandler.js");
require("dotenv").config();

let client = new Discord.Client();
// client.emojiVoteActive = false;
const key = process.env.BOT_KEY;

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`);
});

client.on("typingStart", (channel, user, when) => {
    typingHandler.typingStartHandle(channel, user, when);
});

client.on("message", (message) => {
    interactionHandler(message, client);
    typingHandler.typingSentHandle(message, client);
});

client.login(key);
