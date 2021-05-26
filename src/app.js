require('dotenv').config()
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/users')
const session = require('express-session')

const app = express()

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.isAdmin = process.env.ISADMIN || false;
    res.locals.currentUser = req.user;
    next();
});

const routes = require('./routes/')

app.use(express.json({ limit: '10kb'}))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(express.raw({type: 'application/json'}))
app.use('/', routes)

module.exports = app