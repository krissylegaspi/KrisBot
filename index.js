const Discord = require('discord.js');
const bot = new Discord.Client();

const token = process.env.DISCORD_TOKEN;

require('dotenv').config();

bot.on('ready', () => {
  console.log('This bot is online!');
})

bot.login(token);