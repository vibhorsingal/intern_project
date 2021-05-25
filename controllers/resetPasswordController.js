const Users = require("../models/users")
const mailgun=require('../config/mailgun')
const bcrypt=require('bcrypt')

module.exports.getSendOTPController=(req,res)=>{
    res.render('resetPassword')
}

module.exports.putOTPController=async (req,res)=>{
    const email=req.body.email
    const user=await Users.findOne({email:email})
    if(user){
        const otp=Math.floor(1000 + Math.random()* 9000)
        const data={
            from:'noreply@test.com',
            to:email,
            subject:"OTP for resetting password",
            text:`your OTP is ${otp}`
        }
        mailgun.messages().send(data, (error, body) => {
            console.log(error)
            console.log(body);
        }); 
        await Users.findOneAndUpdate({email:email},{otp:otp})
        // const newUser=await Users.findOne({email:email})
        res.render('verifyOtp',{email:email})

        //TODO:(error handling)
        
        
        // res.send(newUser)
    }

}

module.exports.verifyOtpController=async (req,res)=>{
    const { verifyOtp,email }=req.body
    const user=await Users.findOne({email:email})
    const otp=parseInt(verifyOtp)
    console.log(otp,user)

    if(otp===user.otp){
        res.render('newPassword',{email:email})
    }
}

module.exports.newPasswordController=async (req,res)=>{
    const {email,newPassword,confirmPassword}=req.body
    if(newPassword===confirmPassword){
        const salt=await bcrypt.genSalt(10)
        const password=await bcrypt.hash(newPassword,salt)
        console.log(password)
        await Users.findOneAndUpdate({email:email},{password:password})
        res.redirect('/')
    }
}