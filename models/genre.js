const Joi = require('joi')
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
       
    }
})

const Genre = mongoose.model('Genre',genreSchema)

const validate=(arg)=>{
    const schema =Joi.object({
        name: Joi.string().min(5).max(50).required()
    }) 
    return schema.validate({name:arg})
}

exports.Genre = Genre
exports.validate = validate
exports.genreSchema = genreSchema