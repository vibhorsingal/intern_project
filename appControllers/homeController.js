const fetch=require('node-fetch')
//getting the home page showing all the bands 
module.exports.getHomePage=async (req,res)=>{
    if(req.user){
        try{
            console.log(req.user._id)
            const data=await fetch(`http://localhost:5000/api/users/${req.user._id}/bands`)
            const bands=await data.json()
            console.log(bands)
            return res.render('home',{bands})
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        return res.redirect('/')
    }
}

//getting the profile page of user
module.exports.getProfilePage=(req,res)=>{
    return res.render('profile',{
        user:req.user
    })
}
//update profile
module.exports.updateProfileController=async (req,res)=>{
    const data=await fetch(`http://localhost:5000/api/users/${req.user._id}`,{
        method:'POST',
        body:JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    })

    const user=await data.json()
    return res.redirect('/profile')
}

module.exports.getAddBandController=(req,res)=>{
    res.render('addBand')
}

//adding a new Band 
module.exports.addBandController=async (req,res)=>{
    const data=await fetch(`http://localhost:5000/api/users/${req.user._id}/bands`,{
        method:'POST',
        body:JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    })
    const newUser=await data.json()
    res.redirect('/')
}