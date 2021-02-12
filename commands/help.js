//currently have to define the whole help message, might try to automate the help command based off of strings stored in all the commands
//would take a good bit of refactoring! 

module.exports = (msg) => {
    let str = "";
    str += "```md\n";
    str += "+ Varvbot has numerous exciting features such as...\n";
    str += '<ping               = "pong!">\n';
    str += '<joke               = "enjoy one of VarvBot\'s numerous hilarious jokes!">\n';
    str += '<roll n             = "rolls a dice with n sides!">\n';
    str += '<ball               = "Wanna ball?">\n';
    str += '<flip               = "Flip a coin!">\n';
    str += '<love (name) (name) = "Find out your love score!">\n';
    str += '<stock (symbol)     = "Gives information on the stock specified by the given symbol!">\n';
    str += '<help               = "help!">\n';
    str += "```";
    
    msg.channel.send(str);
}
