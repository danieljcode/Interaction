const Discord = require('discord.js');

const {prefix} = require("../config/prefix.json");
const TimeRequestHandler = require("./time.request.handler");
const WeatherRequestHandler = require("./weather.request.handler");

function MessageHandler(message) {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //Splitting the users message up into commands and user arguments
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();


    //A basic command that tells the user who they are!
    if (command === "whoami") {
        message.channel.send(message.author.username + "#" + message.author.discriminator);
    }


    if (command === "time") {
        if (!args.length) {
            return message.channel.send(`Get current Time: You have not provided a timezone ${message.author}`)
        }

        try {
            TimeRequestHandler(args[0], (response) => {
                const data = JSON.parse(response.body); //Parsing the API data into usable format


                if (data.currentDateTime == null || data.currentDateTime == undefined) {
                    //This code runs if the API is down or the user requested data for a nonexistent/unsupported timezone and stops the bot from trying to send an empty message and crashing...
                    return message.channel.send(`${message.author} We were unable to get the current time in the requested timezone... The timezone might not be supported or there may be a temporarily outage on our end`)
                }
                return message.channel.send(data.currentDateTime); //If the time was fetched successfully then this line send the data to the user in the server...
            })
        } catch (e) {
            return message.channel.send(`${message.author} We were unable to get the current time in the requested timezone... The timezone might not be supported or there may be a temporarily outage`)
        }
    }

    if (command == "weather") {
        if (!args.length) {
            return message.channel.send(`Get weather: You have not provided a city or town ${message.author}`)
        }

        try {
            WeatherRequestHandler(args[0], (response) => {
                const data = JSON.parse(response.body);


                if (data.current == null || data.current == undefined) {
                    //This code runs if the API is down or the user requested data for a nonexistent/unsupported timezone and stops the bot from trying to send an empty message and crashing...
                    return message.channel.send(`${message.author} We were unable to get the current weather for the location you requested... Please try again later.`)
                }

                const weatherEmbed = new Discord.MessageEmbed()
                .setImage(data.current.weather_icons[0])
                .setTitle(`Weather in ${data.location.name}`)
                .setTimestamp()
                .addFields(
                    {name: "Temperature now:", value: `${data.current.temperature}℃`, inline: true},
                    {name: "Feels like:", value: `${data.current.feelslike}℃`, inline: true},
                    {name: "Description:", value: `${data.current.weather_descriptions[0]}`, inline: true},
                    {name: "Full location:", value: `${data.location.name}, ${data.location.region}, ${data.location.country}`, inline: true}
                )

                return message.channel.send(weatherEmbed);

            })

        } catch (e) {
            return message.channel.send(`${message.author} We were unable to get the current weather for the location you requested... Please try again later.`)
        }
    }
}

module.exports = MessageHandler;