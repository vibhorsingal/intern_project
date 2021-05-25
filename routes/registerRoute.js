const express = require('express')
const route = express.Router()
const { getRegisterPage, postRegisterPage } = require('../controllers/register')
const { getSendOTPController,putOTPController } = require('../controllers/resetPasswordController')

route.get('/',getRegisterPage)
route.post('/',postRegisterPage)
route.get('/user',getSendOTPController)
route.put('/send-otp',putOTPController)
module.exports=route