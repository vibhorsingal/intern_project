const route = require('express').Router()
const passport = require('passport')
require('../config/passport')
const { getLoginController, logoutController, getRegisterController, registerNewUserController } = require('../appControllers/loginControllers')
const { getHomePage, getProfilePage, addBandController, getAddBandController,updateProfileController } = require('../appControllers/homeController')
const { getSendOTPController, sendOtpController, verifyOtp, getVerifyOtp, getNewPassword, saveNewPassword } = require('../appControllers/resetPasswordControllers')

route.get('/', getLoginController)
route.post('/', passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/' }))
route.get('/home', getHomePage)
route.get('/profile', getProfilePage)
route.post('/profile', updateProfileController)
route.get('/logout', logoutController)
route.get('/addBand', getAddBandController)
route.post('/addBand', addBandController)
route.get('/register', getRegisterController)
route.post('/register', registerNewUserController)
route.get('/sendOtp', getSendOTPController)
route.post('/sendOtp', sendOtpController)
route.get('/verifyOtp', getVerifyOtp)
route.post('/verifyOtp', verifyOtp)
route.get('/newPassword', getNewPassword)
route.post('/newPassword', saveNewPassword)

module.exports = route