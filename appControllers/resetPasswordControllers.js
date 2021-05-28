const fetch = require('node-fetch')

//rendering sending otp page
module.exports.getSendOTPController = (req, res) => {
    res.render('resetPassword')
}

//sending otp to the user's email
module.exports.sendOtpController = (req, res) => {
    console.log(req.body)
    fetch('http://localhost:5000/api/users/send-otp', {
        method: 'PUT',
        body: JSON.stringify({ email: req.body.email }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(response => {
            console.log(response)
            req.session.email = req.body.email
            return res.redirect('/verifyOtp')
        })
        .catch(err => { return res.redirect('/sendOtp') })
}

// checking if OTP matches

module.exports.verifyOtp=(req,res)=>{
    fetch('http://localhost:5000/api/users/verify-otp',{
        method:'POST',
        body:JSON.stringify(req.body),
        headers: {'Content-Type':'application/json'}
    }).then(res=>res.json())
    .then(res=>{
        res.redirect('/')
    })
}

//render the verify otp page 
module.exports.getVerifyOtp = (req, res) => {
    res.render('verifyOtp', { email: req.session.email })
}

//render the resetting new password page
module.exports.getNewPassword = (req, res) => {
    res.render('newPassword', { email: req.session.email })
}

//saving the new password
module.exports.saveNewPassword = (req,res)=>{
    fetch('http://localhost:5000/api/users/reset-pswd',{
        method:'POST',
        body:JSON.stringify(req.body),
        headers:{'Content-Type':'application/json'}
    })
    .then(res=>res.json())
    .then(res=>{
        return res.redirect('/')
    })
    .catch( err=>{
        return res.redirect('/newPassword')
    })
}