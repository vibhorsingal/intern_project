const Users = require("../models/users")
const mailgun=require('../config/mailgun')
const bcrypt=require('bcrypt')

// creating an OTP and sending it to the mail of the user

module.exports.putOTPController=async (req,res)=>{
    const email=req.body.email
    console.log(email)
    const user=await Users.findOne({email:email})
    if(user){
        const otp=Math.floor(1000 + Math.random()* 9000)
        const data={
            from:'noreply@test.com',
            to:email,
            subject:"OTP for resetting password",
            text:`your OTP is ${otp}`
        }
         await Users.findOneAndUpdate({email:email},{otp:otp})
        mailgun.messages().send(data, (error, body) => {
            if(body){console.log(body)
                 return res.send(body)
                }
            if(error) return res.send(null)
        }); 
    }

}

//verify the OTP of user from database and form

module.exports.verifyOtpController=async (req,res)=>{
    const { verifyOtp,email }=req.body
    const user=await Users.findOne({email:email})
    const otp=parseInt(verifyOtp)
    //console.log(otp,user)

    if(otp==user.otp){
        console.log(user)
        return res.json(user)
    }
    else {
        return res.send(null) 
    }
}


//setting new password of user
module.exports.newPasswordController=async (req,res)=>{
    const {email,newPassword,confirmPassword}=req.body
    if(newPassword===confirmPassword){
        const salt=await bcrypt.genSalt(10)
        const password=await bcrypt.hash(newPassword,salt)
        console.log(password)
        const user=await Users.findOneAndUpdate({email:email},{password:password})
        return res.send(user)
    }
    else{
        return res.send(null)
    }

}

