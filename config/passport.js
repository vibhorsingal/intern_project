const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/users')
const bcrypt=require('bcrypt')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (username, password, done) => {
        const user= await Users.findOne({email:username})
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
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });