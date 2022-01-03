//Rolls a die with n sides
module.exports = {
    helpString: "roll {n}: rolls an n-sided die!",
    fun: (msg, tokens) => {
        if (tokens.length != 2) {
            msg.channel.send('Formatted improperly! Try again!');
            return;
        }

        const sides = parseInt(tokens[1]);
        if (isNaN(sides) || sides < 1) {
            msg.channel.send('Formatted improperly! Try again!');
            return;
        }

        msg.channel.send(`You rolled a ${Math.ceil(Math.random() * sides)}!`);
    }
}