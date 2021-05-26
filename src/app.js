const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const app = express()

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

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

app.use((req, res, next) => {
    res.locals.isAdmin = process.env.ISADMIN || false;
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.assets = require('./public/assets/scripts/assets');
    next();
});

const routes = require('./routes/')

app.use(express.json({ limit: '10kb'}))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(express.raw({type: 'application/json'}))
app.use('/', routes)

module.exports = app