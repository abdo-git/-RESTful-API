const mongoose = require('mongoose')
const winston = require('winston');

const dbURI = 'mongodb+srv://abaddi:ECYPpMytQWNfTq4y@cluster0.kojzo.mongodb.net/vidly';

module.exports =function(){
    mongoose.connect(dbURI,{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true})
        .then(()=>{
            winston.info('connected to mongoDB')
            
        })
       
}