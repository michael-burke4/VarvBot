module.exports = (msg, client) => {
    
    const lowerCase = msg.content.toLowerCase();
    var StartIndex;
    var EndIndex;
    var currentWord;

    for (let i = 0; i < lowerCase.length; i++) {

        if(lowerCase[i] == ' '){
            //new word start gets updated to after the space
            StartIndex = i + 1;

            //end of the word is the next space or end of the message after the word start
            EndIndex = lowerCase.indexOf(' ',StartIndex);

            //gets the word from the start to the end
            currentWord = lowerCase.substring(StartIndex,EndIndex);
        }

        if(lowerCase[i] == 'e' && lowerCase[i+1] == 'r'){
            msg.channel.send(currentWord + "? I hardly know her!");
        }
    }
}
