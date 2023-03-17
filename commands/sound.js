const { createReadStream } = require('node:fs');
const { NoSubscriberBehavior, joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType, VoiceConnectionStatus } = require('@discordjs/voice');
let connection = null;
const player = createAudioPlayer({
	behaviors: {
		noSubscriber: NoSubscriberBehavior.Play,
	},
});
let vc = null;

player.on(AudioPlayerStatus.Playing, () => {
	console.log('The audio player has started playing!');
});

module.exports = {
    params : ["name"],
    description: "Plays the specified sound in your current voice channel!",
    fun: async (msg, tokens, client) => {
        // FIXME: bot can't detect that the user is in a voice channel?
        if (!(msg.member.voice.channel)) {
            msg.channel.send("You are not in a voice channel!");
            return;
        }

        if (tokens.length != 2) {
            return;
        }
		if(connection == null) {
        	// client.connection = await msg.member.voice.channel.join();
            console.log("connection was null");
            vc = msg.member.voice.channel;
            connection = joinVoiceChannel({
                channelId: vc.id,
                guildId: vc.guild.id,
                adapterCreator: vc.guild.voiceAdapterCreator,
            });
		}

        const resource = createAudioResource(createReadStream(`sounds/${tokens[1]}.ogg`), {
            inputType: StreamType.OggOpus,
        });
        player.play(resource);
        connection.subscribe(player);


        // client.dispatcher = client.connection.play(`sounds/${tokens[1]}.ogg`);
        // client.dispatcher.on("error", console.error);
    },
    dc: async () => {
        console.log("Disconnected from voice channel!");
        player.stop();

        // if(vc == null) {
        //     console.log("No voice channel!");
        //     return;
        // }

        if(connection == null) {
            console.log("connection was null");
            return;
        }

        connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
            try {
                await Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
                // Seems to be reconnecting to a new channel - ignore disconnect
            } catch (error) {
                // Seems to be a real disconnect which SHOULDN'T be recovered from
                connection.destroy();
            }
        });
    }
}

