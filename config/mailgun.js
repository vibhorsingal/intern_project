const mailgun=require('mailgun-js')({
    apiKey:process.env.MAILGUN_API,
    domain:process.env.MAILGUN_DOMAIN
})

module.exports=mailgun