const express = require('express')
const route = express.Router()
const { getRegisterPage, postRegisterPage } = require('../controllers/register')

route.get('/',getRegisterPage)
route.post('/',postRegisterPage)
module.exports=route