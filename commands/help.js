const fs = require("fs");


console.log(__dirname);

let commands = {};

fs.readdir(__dirname, (err, files) => {
    if (err) {
        console.log(err);
    }
    else {
        files.forEach(file => {
            let commandObj = require(`${__dirname}/${file}`);
            // console.log(file.slice(0, -3));
            // console.log(commandObj);
            commands[file.slice(0,-3)] = commandObj;
        })
    }
});

module.exports = {
    helpString: "Asks me for help!",
    fun: (msg) => {
        
    }
}
