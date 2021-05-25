require('dotenv').config()

const express=require('express')
const app=express()
require('./config/database')
const route=require('./routes/registerRoute')
const loginRoute=require('./routes/loginRoute')
const session=require('express-session')
const passport=require('passport')
const MongoStore=require('connect-mongo')
const methodOverride=require('method-override')

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

app.use('/',loginRoute)
app.use('/api/users',route)


app.listen(5000,()=>{
    console.log('server started at http://localhost:5000')
})