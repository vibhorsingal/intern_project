const bcrypt = require('bcrypt')
const  Users  = require('../models/users')

module.exports.getRegisterPage = (req, res) => {
    res.render('register')
}

module.exports.postRegisterPage = async (req, res) => {
    const { name, email, organization, date_of_birth ,password, confirm_password } = req.body
    
    if (password === confirm_password) {
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt);
        const user=new Users({
            name,
            email,
            organization,
            date_of_birth,
            password:pass
        })
        
        const saved=await user.save();
        res.redirect('/')
    }
    
}