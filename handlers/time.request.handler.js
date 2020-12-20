const request = require("request");



function GetCurrentTime(timezone, callback){
    var url = `http://worldclockapi.com/api/json/${timezone}/now`;

    request(url, function(error, response){
        if(error){
            return callback(error);
        }
        return callback(response)
    })
}

module.exports = GetCurrentTime;