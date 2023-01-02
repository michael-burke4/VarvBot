
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

const INTERVAL = 30000

module.exports = {
    typingStartHandle: (channel, user, when) => {
        // console.log(user.id, "is typing");
	if(!map.has(user.id)){
	    map.set(user.id, 0);
	}
	let typeCnt = map.get(user.id)+1;
        map.set(user.id, typeCnt);
        setTimeout(async () => {
            // console.log("Wait done!");
            // console.log(map.get(user.id))
            if(map.get(user.id) == typeCnt){
                let response = `${user}, was typing and didn't send a message 😂`;
                console.log(response);
		channel.send(response);
            }
        }, INTERVAL);
    },
    typingSentHandle: (msg, client) => {
        // console.log(`${msg.author.id} sent a message`);
        
	let typeCnt = map.get(msg.author.id)+1;
        map.set(msg.author.id, typeCnt);
    }
}
