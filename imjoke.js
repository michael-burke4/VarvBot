//simple function
//if the message starts with some variant of I am, followed by some string "...", varvbot will respond by saying
// Hi "...", I'm VarvBot!
module.exports = (msg, client) => {
    const lowerCase = msg.content.toLowerCase();
    if (lowerCase.startsWith("i'm ")) {
        msg.channel.send(`Hi ${msg.content.substring(4)}, I'm ${client.user.username}!`);
    }
    if (lowerCase.startsWith("im ")) {
        msg.channel.send(`Hi ${msg.content.substring(3)}, I'm ${client.user.username}!`);
    }
    if (lowerCase.startsWith("i am ")) {
        msg.channel.send(`Hi ${msg.content.substring(5)}, I'm ${client.user.username}!`);
    }
}
