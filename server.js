require('dotenv').config()
//require express
const express=require('express')
const app=express()
//configuring database 
require('./config/database')
//backend routes 
const apiRoute=require('./routes/authenticationRoute')

//frontend routes
const appRoute=require('./appRoutes/app')
//cookies and passport
const session=require('express-session')
const passport=require('passport')
const MongoStore=require('connect-mongo')

const methodOverride=require('method-override')
const flash=require('express-flash')
const cors=require('cors')

app.use(cors())
app.use(flash())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.set('view engine','ejs')
app.use('/',express.static(__dirname+'/public'))

const store=MongoStore.create({mongoUrl:"mongodb://localhost:27017/bands" , collectionName:'sessions'})
app.use(session({
    resave:false,
    secret:'qwerty',
    saveUninitialized:false,
    store:store,
    cookie:{
        maxAge:24 * 60 * 60 * 1000
    }
}))

app.use(passport.initialize())
app.use(passport.session())


//backend routes are deployed here on localhost:5000/api/users
app.use('/api/users',apiRoute)
//front end routes are deployed here 
app.use('/',appRoute)
app.listen(5000,()=>{
    console.log('server started at http://localhost:5000')
})