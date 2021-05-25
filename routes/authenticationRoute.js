const express = require('express')
const route = express.Router()
const { getRegisterPage, postRegisterPage } = require('../controllers/register')
const { getSendOTPController,putOTPController,verifyOtpController, newPasswordController } = require('../controllers/resetPasswordController')

route.get('/',getRegisterPage)
route.post('/',postRegisterPage)
route.get('/user',getSendOTPController)
route.put('/send-otp',putOTPController)
route.post('/verify-otp',verifyOtpController)
route.put('/reset-pswd',newPasswordController)

module.exports=route