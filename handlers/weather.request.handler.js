const request = require("request");
const {token} = require("../config/weather.api.token.json");

function WeatherRequestHandler(location, callback){
    var url = `http://api.weatherstack.com/current?access_key=${token}&query=${location}`;

    request(url, function(error, response){
        if(error){
            return callback(error);
        }
        return callback(response)
    })
}

module.exports = WeatherRequestHandler;