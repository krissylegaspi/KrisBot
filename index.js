require('dotenv').config();

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.DISCORD_TOKEN;