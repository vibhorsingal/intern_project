const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt=require('bcrypt')
const fetch=require('node-fetch')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (username, password, done) => {
        const data= await fetch('http://localhost:5000/api/users/user',{
                        method:'POST',
                        body:JSON.stringify({'email':username}),
                        headers: { 'Content-Type': 'application/json' }
        })
        const user=await data.json()
        console.log(user)
        if(!user){
            return done(null, false, { message: 'Incorrect email' })
        }
        else{
            const match=await bcrypt.compare(password,user.password);
            if(!match){
                return done(null, false, {message: 'Incorrect Password'})
            }
            else{
                return done(null,user)
            }
        }
    }
))

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(async(id, done)=> {
    try{
        const data=await fetch(`http://localhost:5000/api/users/user/${id}`)
        const user=await data.json()
        console.log(user)
        if(user) return done(null,user)
        return done(err)
    }
    catch(err) {
        console.log(err)
    }
  });