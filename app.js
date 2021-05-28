const Discord = require("discord.js");
const config = require("./config.json");
const commandHandler = require("./commands.js");
const imjoke = require("./imjoke.js");
const chickenButt = require("./chickenbutt.js");
const atSomeone = require("./atsomeone.js");
const emojiVote = require("./emojivote.js");
require("dotenv").config();


let client = new Discord.Client();
client.emojiVoteActive = false;
const key = process.env.BOT_KEY;

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`);
});

client.on("message", (message) => {
    
    if(message.content.includes("@someone")){
        atSomeone(message);
    }
    
    if (config.options.enableImJoke) {
        imjoke(message, client);
    }

    if(config.options.enableChickenButt){
        chickenButt(message,client);
    }

    if(!client.emojiVoteActive && message.channel.name === "emoji-submission" && message.attachments.size == 1){
        emojiVote(message, client);
    }
    
    commandHandler(message, client);
});

client.login(key);
