# VarvBot For Discord
---

Table of contents: 
- [Introduction](#introduction)
- [Setup](#setup)
    - [Discord Developer Portal](#discord-developer-portal)
    - [Node](#node)
    - [Config](#config)
- [Running the Bot](#running-the-bot)
- [Creating New Commands](#creating-new-commands)
---

# Introduction
Currently, VarvBot is a feature starved discord bot that can't really do much.

This will be a short guide on how to use this code to run your own fork of varvbot, which you can modify to your liking.

---

# Setup

Setting up your discord bot is simple!

### Discord Developer Portal
To start, log in to discord.com, then navigate to the ['Applications' section of the discord developer portal.](https://discord.com/developers/applications) Now that you're here, simply click on the "New Application" button. Give your application a name and finish creating the application.

Now, navigate to the "bot" menu on the left pane, and build yourself a bot. Now that the bot has been created, you can find the bot's Token, which will be necessary for running this bot. 

Now that you have a bot, you're going to want to add it to a server. For starters, I would recommend adding it to a testing server with only you and your bot in it.

In order to add your bot to your server, navigate to the "OAuth2" menu on the discord developer portal. Navigate to the "Scopes" section and check the box labelled "bot". Directly under the "scopes" section, there will be a new section labelled "bot permissions." Take some time to decide which features you see yourself adding in the future, and grant whatever permissions you see fit. In general, permissions like 'send messages' and 'manage messages' are a no-brainer. 

You have officially set up your discord bot's invite link! Simply copy the link at the bottom of the "scopes" pane, paste it into your browser, and add your bot to your desired server.

The last thing you're going to want from the developer portal is the bot's api key. In order to find this key, navigate again to the "Bot" menu on the left of the page. Just to the right of the bot's profile picture is where you'll find the token. Simply copy the token to your clipboard with the **copy** button. This will be used later in the [config](#config) section of this guide.

### Node
Unfortunately for you, VarvBot is not super user friendly! You're going to have to set up Node.js yourself to run VarvBot! Node.js should be easy to set up if you're savvy, and if you've already got it set up then you're in luck! The only packages VarvBot uses (for now) are discord.js, fs, and unirest. Running npm install _should_ install the right versions of the node packages used in this project. Let me know if things don't work!

### Config
The last piece of setup you should have to do is create a config.json file. I've provided a config-example.json file which follows the format of what your config.json file should look like. Here's a short rundown of what each entry in the file does:

-"prefix": determines the character or string used to issue a command to the bot. By default, this is !, which is a common character for chatbots, so you may want to change this. (VarvBot currently does NOT support using different prefixes on different servers)

-"key": The bot's token which you _should_ have copied on your clipboard from earlier on. (If you don't have this, check out the [last paragraph of the discord developer portal section of this document](#discord-developer-portal)) Make sure you **DO NOT SHARE** your api key with **anyone**!

-"admin_roles": as of right now, these roles don't do anything. The plan is to allow certain bot commands only to be obeyed if the user calling the command has one of these roles in the discord server. For example, if there were to be a '!ban [user]' command, VarvBot would only ban this user if the person that typed in '!ban [user]' has the **admin** role.

-"commands_path": VarvBot works by reading in all of the .js files found within the commands folder. You can customize the name/location of this commands folder by changing this variable. I would reccommend _not changing this_ and following the provided format.

-"yahoo_key": Varvbot can use the yahoo finance api to find and present stock information. In order to use this api yourself, you'll need to get an api key from here: https://rapidapi.com/apidojo/api/yahoo-finance1/. If you don't feel like doing this, just delete the stock.js file from the commands folder and everything should be fine. 

You should be able to simply replace the "api_key_here" with the token you copied onto your clipboard from the discord developer portal, and then rename config-example.json to config.json.

# Running the Bot
Once you have your config.json file set up and your node project has all packages installed, it should be as easy as typing 'node app.js' into your terminal/command prompt.

If this doesn't work, then oh well! That sucks!

# Creating New Commands
Now that you have your own VarvBot up and running, you might have some great ideas for features you want to add. With the way VarvBot reads in his commands from the ./commands folder by default, this should be fairly simple.

Whenever Varvbot sees that a new message has been sent to a server that starts with the defined command prefix, message and its contents are sent to a command handler. The command handler reads in all of the commands defined in the commands.js folder as soon as the app is started. If the command recieved by varvbot matches the name of one of the files in the commands folder, the function defined in the module.exports of said .js file will be executed.

The command handler hands off the message and all of its metadata, the individual components of the message broken apart by spaces referred to as the command tokens, and the discord bot's own client user data. This data is useful for commands that rely on knowing the bot's state within the discord itself (ie. whether or not the bot is in a voice channel, if it is streaming sound into a voice channel, etc.). Refer to the simple functions like !ping and !ball predefined within varvbot for examples on how these commands work. These commands can work as a template for future commands which you wish to add yourself!
