const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json")

// const reactEmoji = "🎙";️

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (message.member.id !="262852578465808386") {
      return
  }
    if (message.content === 'mute') {
    var botMessage = await message.channel.send("Mute Control");
    botMessage.react("🎙️")
  }
});

client.login(config.token);