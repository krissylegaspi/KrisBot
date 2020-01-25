require('dotenv').config();
const Discord = require('discord.js');
const {
  Client,
  Attachment
} = require('discord.js');
const bot = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
// console.log('token=' + token)

const PREFIX = '!';

bot.on('ready', () => {
  console.log('This bot is online!');
});

bot.on('message', message => {

  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case 'test':
      message.channel.sendMessage('1, 2, 3')
      break;
    case 'website':
      message.channel.sendMessage('Websites can be found in #faq ')
      break;
    case 'meme':
      if (args[1] === 'version') {
        message.channel.sendMessage('');
      } else {
        message.channel.sendMessage('')
      }
      break;
    case 'clear':
      if (!args[1]) return message.reply('Error, please define a second argument.')
      message.channel.bulkDelete(args[1]);
      break;
    case 'rip':
      const attachment = new Attachment('./rip.png');
      message.channel.sendMessage(attachment);
      break;
  }
})

bot.login(token);