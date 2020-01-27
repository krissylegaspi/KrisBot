require('dotenv').config();
const Discord = require('discord.js');
const {
  Client,
  Attachment
} = require('discord.js');
const bot = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const giphyToken = process.env.GIPHY_TOKEN;
// console.log('token=' + token)

const ytdl = require("ytdl-core");

// Prefix for bot commands
const PREFIX = '!';

// Music bot queue
var servers = {

};
var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)

bot.on('ready', () => {
  console.log('This bot is online!');
});

bot.on('message', message => {
  if (message.content == "LOL") {
    message.channel.sendMessage('That made me breathe air out of my nose!');
  }
  if (message.content == "omg") {
    message.channel.sendMessage('I know, right?');
  }
})

bot.on('message', message => {

  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {

    // Chat bot
    case 'test':
      message.channel.sendMessage('1, 2, 3')
      break;
    case 'website':
      message.channel.sendMessage('https://github.com/krissylegaspi/KrisBot')
      break;
    case 'LOL':
      message.channel.sendMessage('That made me breathe air out of my nose!')
      break;
    case 'clear':
      // if (!args[1]) return message.reply('Error, please define a second argument.')
      // message.channel.bulkDelete(args[1]);
      if (message.member.roles.some(role => role.name === 'Moderator')) {
        if (!args[1]) return message.reply('Error, please define a second argument.')
        message.channel.bulkDelete(args[1]);
      }
      break;
    case 'rip':
      const attachment = new Attachment('./rip.png');
      message.channel.sendMessage(attachment);
      break;

      // Music bot
    case 'play':
      // Music bot queue
      function play(connection, message) {
        var server = servers[message.guild.id];
        server.dispatcher = connection.playStream(ytdl(server.queue[0], {
          filter: "audioonly"
        })); // Downloads audio only
        server.queue.shift();
        server.dispatcher.on("end", function () {
          if (server.queue[0]) {
            play(connection, message);
          } else {
            connection.disconnect();
          }
        });
      }
      if (!args[1]) {
        message.channel.sendMessage("You need to provide a link.");
        return;
      }
      if (!message.member.voiceChannel) {
        message.channel.sendMessage("You must be in a voice channel to use this command.");
        return;
      }
      if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      }
      // For adding bot to multiple servers
      var server = servers[message.guild.id];
      server.queue.push(args[1]);
      // Music bot functions
      // Music bot joins voice channel
      if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
        play(connection, message);
      })
      break;

    case 'skip':
      if (message.member.roles.some(role => role.name === 'Moderator')) {
        var server = servers[message.guild.id];
        if (server.dispatcher) server.dispatcher.end();
        message.channel.sendMessage("Skipping the song.")
      }
      break;
    case 'stop':
      if (message.member.roles.some(role => role.name === 'Moderator')) {
        var server = servers[message.guild.id];
        if (message.guild.voiceConnection) {
          for (var i = server.queue.length - 1; i >= 0; i--) {
            server.queue.splice(i, 1);
          }
          server.dispatcher.end();
          message.channel.sendMessage("Queue has ended.")
          console.log('Stopped the queue.')
        }
        if (message.guild.connection) message.guild.voiceConnection.disconnect();
      }
      break;

      // Admin commands
    case 'kick':
      if (message.member.roles.some(role => role.name === 'Moderator')) {
        if (!args[1]) message.channel.send('You need to choose a user.')
        const user = message.mentions.users.first();
        if (user) {
          const member = message.guild.member(user);
          if (member) {
            member.kick('You were kicked from the server!').then(() => {
              // message.reply(`Successfully kicked ${user.tag}`);
              giphy.search('gifs', {
                  "q": "kick"
                })
                .then((response) => {
                  var totalResponses = response.data.length;
                  var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                  var responseFinal = response.data[responseIndex];
                  message.channel.send(`:wave: ${user.tag} has been successfully kicked.`, {
                    files: [responseFinal.images.fixed_height.url]
                  })
                })
            }).catch(error => {
              message.reply('I was unable to kick the member.');
              console.log(error);
            });
          } else {
            message.reply("That user isn\'t in the server.")
          }
        } else {
          message.reply('That user isn\'t in the server.')
        }
      }
      break;

  }
})

bot.login(token);