const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client();

const token = process.env.DISCORD_TOKEN;
// console.log('token=' + token)

bot.on('ready', () => {
  console.log('This bot is online!');
});

bot.login(token);