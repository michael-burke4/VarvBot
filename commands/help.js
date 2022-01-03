//currently have to define the whole help message, might try to automate the help command based off of strings stored in all the commands
//would take a good bit of refactoring! 

module.exports = {
    helpString: "help:                 asks me for help!",
    fun: (msg, tokens, client) => {
        
        msg.channel.send(client.helpMsg);
    }
}
