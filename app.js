const { Client, GatewayIntentBits } = require('discord.js');
const interactionHandler = require("./interactionhandler.js");
require("dotenv").config();

let client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const key = process.env.BOT_KEY;

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    interactionHandler(message, client);
});

client.login(key);
