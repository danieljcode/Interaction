const {prefix} = require("../config/prefix.json");

function MessageHandler(message, callbackFunction){
    
    //THE MESSAGE IS INTENDED FOR THE BOT
    if(message.content.startsWith(`${prefix}`)){
        console.log("y");

        
    }else{
        //DO NOTHING
    }
}

module.exports = MessageHandler;