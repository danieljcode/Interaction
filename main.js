const Discord = require('discord.js');
const client = new Discord.Client();
const {token} = require("./config/bot.token.json");
const MessageHandler = require("./handlers/message.handler");

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    MessageHandler(message);
});

client.login(token);