if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const express = require('express')
const enforce = require('express-sslify')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')

const passport = require('passport')
const LocalStrategy = require('passport-local')

const User = require('./models/user')
const users = require('./routes/users')
const clock = require('./routes/clock')
const notes = require('./routes/notes')

const MongoDBStore = require('connect-mongo')(session)

const DB_URI = process.env.DB_URL
const secret = process.env.SECRET
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection 
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
}) 

const app = express() 

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// app.use(enforce.HTTPS({ trustProtoHeader: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const store = new MongoDBStore({
    url: DB_URI,
    secret,
    touchAfter: 24 * 60 * 60
})

store.on('error',e => console.error(e)) 

const sessionConfig = {
    name: 'session',
    secret,
    resave: false,
    saveUnininitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.isAdmin = process.env.ISADMIN || false
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


app.use('/', users )
app.use('/clock', clock)
app.use('/notes', notes)

module.exports = app