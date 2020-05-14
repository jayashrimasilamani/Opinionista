//keys.js find which credential to return

if(process.env.NODE_ENV == 'production'){
    //we are in production - return production set of keys
    module.exports= require('./prod');
}else{
    //we are in developemnt - return development set of keys
    module.exports  = require('./dev');
}