const express = require('express')
const {Genre,validate} = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const validateObjectId = require('../middleware/validateObjectID')
const router = express.Router();

router.get('/',async (req,res)=>{
        const genres = await Genre.find().select('-__v').sort('name');
        res.send(genres)
})

router.get('/:id',validateObjectId,async (req,res)=>{
    
    const genre = await Genre.findById(req.params.id).select('-__v')
    
    genre ? res.send(genre) : res.status(404).send('the genre with the giveen Id was not found .')
})

router.post('/',auth,async (req,res)=>{
    const {error} = validate(req.body.name)
    if(error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({name: req.body.name})
    genre = await genre.save();
    res.send(genre)
})

router.put('/:id',[auth,admin],async (req,res)=>{
    const {error} = validate(req.body.name)
    
    if(error) return res.status(400).send(error.details[0].message)
    const genre = Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new: true})
    
    if(!genre) return res.status(400).send('the genre with the giveen Id was not found .')
    res.send(genre)
})

router.delete('/:id',[auth,admin,validateObjectId],async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if(!genre) return res.status(400).send('the genre with the giveen Id was not found .')
 
    res.send(genre)
})

module.exports = router