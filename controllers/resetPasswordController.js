const Users = require("../models/users")

module.exports.getSendOTPController=(req,res)=>{
    res.render('resetPassword')
}

module.exports.putOTPController=async (req,res)=>{
    const email=req.body.email
    const user=await Users.findOne({email:email})
    if(user){
        const otp=Math.floor(Math.random()* 10000)
        await Users.findOneAndUpdate({email:email},{otp:otp})
        const newUser=await Users.findOne({email:email})
        res.send(newUser)
    }

}