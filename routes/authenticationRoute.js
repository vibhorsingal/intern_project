const express = require('express')
const route = express.Router()

const {  postRegisterPage,getPasswordController } = require('../controllers/register')
const { putOTPController,verifyOtpController, newPasswordController } = require('../controllers/resetPasswordController')
const { getProfileController,createBandController,getBandsController,getUserBandController , updateProfileController} = require('../controllers/profileControllers')


// route.get('/',(req,res)=>{res.render('register')})
// route.get('/user',getSendOTPController)
//login route 
route.post('/user',getPasswordController)
//registering a new user  
route.post('/',postRegisterPage) 
//sending a new OTP to user
route.put('/send-otp',putOTPController)
//verifying OTP of a user
route.post('/verify-otp',verifyOtpController)
//resetting the password
route.put('/reset-pswd',newPasswordController)
//getting profile of the user
route.get('/user/:uid', getProfileController)
//creting a new band
route.post('/:uid/bands',createBandController)
//fetching all the bands of a user
route.get('/:uid/bands',getBandsController)
//getting a specific band information 
route.get('/:uid/bands/band/:bid',getUserBandController)
//updating the user profile
route.post('user/:uid',updateProfileController)

module.exports=route