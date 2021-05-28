const bcrypt = require('bcrypt')
const  Users  = require('../models/users')
//registering a user
module.exports.postRegisterPage = async (req, res) => {
    const { name, email, organization, date_of_birth ,password, confirm_password } = req.body
    console.log(req.body)
    //if password matches
    if (password === confirm_password) {

        //checking if email already exits in database

        const user=await Users.findOne({email:email})
        if(user){
            return res.send(null)
        }
        else{
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
            return res.status(201).send(user)
        }
    }
    else{
        //if passwords do not match
        return res.send(null)
    }    
    
}

module.exports.getPasswordController=async (req,res)=>{
    console.log(req.body)
    const user=await Users.findOne({email:req.body.email})
    console.log(user)
    if(user){
        return res.status(201).send(user)
    }
    else{
        return res.send(null)
    }
}