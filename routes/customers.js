const exress = require('express')
const {Customer,validate} = require('../models/customer')
const router = exress.Router()

router.get('/',async (req,res)=>{
    const customers = await Customer.find().sort('name')
    res.send(customers)
})

router.get('/:id',async (req,res)=>{
    const customer = await Customer.findById(req.params.id)
    customer ? res.send(customer) : res.status(404).send('the customer with the given id was not found')
})

router.post('/',async (req,res)=>{
    const {error}= validate(req.body)
    if(error) return res.status(404).send(error.details[0].message)

    let customer = new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    })
    try {
        customer = await customer.save()
        res.send(customer)
    } catch (error) {
        console.log(error.message)
    }
})

router.put('/:id',async (req,res)=>{
    
    const {error} = validate(req.body)

    if(error) return res.status(404).send(error.details[0].message)
    const customer = Customer.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone
    }
        ,{new: true})
    if(!customer) return res.status(404).send('the customer with the giveen Id was not found .')
    res.send(customer)
})

router.delete('/:id',async (req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id)

    if(!customer) return res.status(404).send('the customer with the giveen Id was not found .')
 
    res.send(customer)
})

module.exports = router