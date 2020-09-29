const express = require('express')
const router = express.Router();
const {Movie,validate} = require('../models/movie')
const {Genre} = require('../models/genre')

router.get('/',async (req,res)=>{
    const movies =await Movie.find().sort('title')
    res.send(movies)
})

router.get('/:id',async (req,res)=>{
    const movie = await Movie.findById(req.params.id)
    
    movie ? res.send(movie) : res.status(400).send('the movie with the giveen Id was not found .')
})

router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const genre = Genre.findById(req.body.genreID)
    if(!genre) return res.status(400).send('invalid genre.')
    
    let movie = new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate,
    })
    movie= await movie.save()
res.send(movie)
})

module.exports = router