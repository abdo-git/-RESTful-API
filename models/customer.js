const Joi  = require('joi')
const mongoose = require('mongoose')

const Customer = mongoose.model('Customer',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
}))

const validate = ({name,phone,isGold})=>{
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    })
    return schema.validate({name,phone,isGold})
}

exports.Customer = Customer
exports.validate = validate