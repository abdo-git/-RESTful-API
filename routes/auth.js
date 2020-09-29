const express = require('express')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const router = express.Router();
const {User} = require('../models/user')
const Joi = require('joi')

router.post('/',async (req,res)=>{

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('invalid email or password')

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass)  return res.status(400).send('invalid email or password')

    const token = user.generateAuthToken()
    res.send(token)
})
const validate = ({email,password})=>{
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(5).max(255).required()
    })
    return schema.validate({email,password})
}

module.exports= router