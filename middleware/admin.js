module.exports = (req,res,next)=>{
    //401 unauthorized 
    //403 forbideen
    if(!req.user.isAdmin) return res.status(403).send('access denied!')
    next()
}