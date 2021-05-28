const  fetch  = require("node-fetch")

module.exports.getLoginController=(req,res)=>{
    if(req.user){
        return res.redirect('/home')
    }
    else{
        return res.render('login')
    }
}    

//logout controller

module.exports.logoutController=(req,res)=>{
    console.log(req.user)
    if(req.user){
        req.logout()
        console.log(req.user)
        return res.redirect('/')
    }
    else{
        return res.redirect('/')
    }
}

//get register page
module.exports.getRegisterController=(req,res)=>{
    return res.render('register')
}

//register a new user
module.exports.registerNewUserController=async (req,res)=>{
    // check if registration process was correct or not
        fetch('http://localhost:5000/api/users',{
            method:'POST',
            body:JSON.stringify(req.body),
            headers:{ 'Content-Type':'application/json'}
        }).then(res=>res.json())
        .then(res => res.redirect('/'))
        .catch(err => {
                console.log(err)
                res.redirect('/register')
            }
        )
        
        
}