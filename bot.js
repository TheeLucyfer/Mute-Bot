const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json")

let messageID;
const reactEmoji = ("🎙️")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
    if (message.member.id != "262852578465808386") {
        return
    }
    if (message.content === 'mute') {
        var botMessage = await message.channel.send("Mute Control ```I mute and unmute people```");
        botMessage.react(reactEmoji)
        messageID = botMessage.id
    }
});

client.on("messageReactionAdd", async (messageReaction, user) => {
    if (messageReaction.message.id != messageID) {
        return;
    }

    if (messageReaction.emoji.toString() != reactEmoji) {
        messageReaction.remove()

        if (messageReaction.emoji.toString() != '🤦‍♀️')
            messageReaction.message.react("🤦‍♀️")

        return

    }
    if (user.id != "262852578465808386") {
        return
    }
    let guild = messageReaction.message.channel.guild
    let gMember = new Discord.GuildMember(client, { user }, guild);
    await gMember.fetch();
    // gMember.voice.setMute(true);
    let voiceChannel = gMember.voice.channel
    voiceChannel.members.forEach(member =>{
        member.voice.setMute(true)
    })
})

client.on("messageReactionRemove", async (messageReaction, user) => {
    if (messageReaction.message.id != messageID) {
        return;
    }

    if (messageReaction.emoji.toString() != reactEmoji) {
        return
    }
    
    if (user.id != "262852578465808386") {
        return
    }
    let guild = messageReaction.message.channel.guild
    let gMember = new Discord.GuildMember(client, { user }, guild);
    await gMember.fetch();
    // gMember.voice.setMute(true);
    let voiceChannel = gMember.voice.channel
    voiceChannel.members.forEach(member =>{
        member.voice.setMute(false)
    })
})



client.login(config.token);