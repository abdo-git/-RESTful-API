const mongoose = require('mongoose')
const {genreSchema} = require('./genre')
const Joi = require('joi')

const Movie =mongoose.model('Movie', new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:10,
        maxlength:255,
        trim:true
    },
    genre:{
        type:genreSchema,
        required:true,
    },
    numberInStock:{
       type :Number,
       required:true,
       min:0,
       max:255
    },
    dailyRentalRate:{
        type :Number,
        required:true,
        min:0,
       max:255
     },
}))

const validate = ({title,genreID,numberInStock,dailyRentalRate})=>{
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required().trim(),
        genreID: Joi.string().min(0).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required(),
    })
    return schema.validate({title,genreID,numberInStock,dailyRentalRate})
}

exports.Movie = Movie
exports.validate = validate