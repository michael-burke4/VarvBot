
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

const INTERVAL = 5000

module.exports = {
    typingStartHandle: (channel, user, when) => {
        console.log(user.id, "is typing");
        map.set(user.id, TYPESTER);
        setTimeout(async () => {
            console.log("Wait done!");
            console.log(map.get(user.id))
            if(map.get(user.id)){
                let response = `${user}, was typing and didn't send a message 😂`;
                channel.send(response);
            }
        }, INTERVAL);
    },
    typingSentHandle: (msg, client) => {
        console.log(`${msg.author.id} sent a message`);
        
        map.set(msg.author.id, SENT);
    }
}