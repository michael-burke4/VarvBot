
// module.exports = []

// Handles the typing
// module.exports.push( (channel, user, when) => {
    // console.log(user.id, "is typing");
// });

// Handles the message
// module.exports.push((msg, client) => {
    // console.log(msg.id, "sent a message")
// });
const map = new Map();

const TYPESTER = 1;
const SENT = 0;

const INTERVAL = 15000

module.exports = {
    typingStartHandle: (channel, user, when) => {
        map.set(user.id, TYPESTER);
        setTimeout(async () => {
            if(map.get(user.id)){
                let response = `${user}, was typing and didn't send a message 😂`;
                channel.send(response);
            }
        }, INTERVAL);
    },
    typingSentHandle: (msg, client) => {
        map.set(msg.author.id, SENT);
    }
}