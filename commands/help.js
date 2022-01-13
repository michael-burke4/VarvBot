const fs = require("fs");


let commandStrings = [];
let longestName = -1;

fs.readdir(__dirname, (err, files) => {
    if (err) {
        console.log(err);
    }
    else {
        files.forEach(file => {
            let commandObj = require(`${__dirname}/${file}`);
            let nameAndParams;
            let description = commandObj.description;
            nameAndParams = file.slice(0, -3);
            commandObj.params?.forEach(param => nameAndParams += ` {${param}}`);
            nameAndParams.length > longestName ? longestName = nameAndParams.length : null;
            commandStrings.push({ nameAndParams, description });
        })
    }
});

module.exports = {
    description: "Asks me for help!",
    fun: (msg) => {
        let help = "```\n";
        commandStrings.forEach(obj => help += `${obj.nameAndParams.padEnd(longestName)} : ${obj.description}\n`);
        help += "```";
        msg.channel.send(help);
    }
}
