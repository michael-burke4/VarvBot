module.exports = (msg, tokens) => {

    let elements = msg.content.split(' ');
    
    //!roll command requires exactly 2 tokens
    if(tokens.length == 2){
        let sides = parseInt(tokens[1]);

        //if the second token isn't a number or is less than 1 it is formatted improperly
        if(isNaN(sides) || sides < 1){
            msg.channel.send('Formatted improperly! Try again!');
        }
        else{
            msg.channel.send('You rolled a ' + Math.ceil(Math.random() * sides) + '!');
        }
    }
    else{
        msg.channel.send('Formatted improperly! Try again!');
    }
}