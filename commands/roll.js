//Rolls a die with n sides
module.exports = (msg, tokens) => {
    if (tokens.length != 2) {
        msg.channel.send('Formatted improperly! Try again!');
        return;
    }

    let sides = parseInt(tokens[1]);
    if (isNaN(sides) || sides < 1) {
        msg.channel.send('Formatted improperly! Try again!');
        return;
    }

    msg.channel.send('You rolled a ' + Math.ceil(Math.random() * sides) + '!');
}
