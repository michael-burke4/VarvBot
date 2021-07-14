const Discord = require("discord.js");
const config = require("./config.json");
const commandHandler = require("./commands.js");
const imjoke = require("./imjoke.js");
const chickenButt = require("./chickenbutt.js");
const hardlyKnowHer = require("./ihardlyknowher.js");
const atSomeone = require("./atsomeone.js");
const ihardlyknowher = require("./ihardlyknowher.js");
require("dotenv").config();


const client = new Discord.Client();
const key = process.env.BOT_KEY;

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`);
});

client.on("message", (message) => {

    if (message.content.includes("@someone")) {
        atSomeone(message);
    }

    if (config.options.enableImJoke) {
        imjoke(message, client);
    }

    if (config.options.enableChickenButt) {
        chickenButt(message, client);
    }

    if(!message.author.bot ) {
        ihardlyknowher(message, client);
    }
    

    commandHandler(message, client);
});

client.login(key);
