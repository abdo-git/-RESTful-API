const mongoose = require('mongoose')
const winston = require('winston');
const config = require('config')


module.exports =function(){
    mongoose.connect(config.get('dbURI'),{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true})
        .then(()=>{
            winston.info('connected to mongoDB')
            
        })
       
}