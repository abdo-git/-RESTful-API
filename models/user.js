const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken');
const config = require('config')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:30,

    },
    email:{
        type:String,
        unique:true,
        minlength:5,
        maxlength:255,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024,
    },
    isAdmin:Boolean
})

userSchema.methods.generateAuthToken = function(){
    
    return jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'))
}

const User = mongoose.model('User',userSchema)

const validate = ({name,email,password})=>{
    const schema = Joi.object({
        name:Joi.string().min(5).max(30).required(),
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(5).max(255).required()
    })
    return schema.validate({name,email,password})
}

exports.User = User
exports.validate = validate