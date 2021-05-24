const express=require('express')
const passport = require('passport')
const route=express.Router()
require('../config/passport')

route.get('/',(req,res)=>{
    console.log(req.user)
    if(req.user){
        return res.redirect('/api/users/')
    }
    res.render('login')
})

route.post('/',passport.authenticate('local',{ successRedirect:'/api/users/done'}))

module.exports=route