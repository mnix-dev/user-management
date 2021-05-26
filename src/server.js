require('dotenv').config()
const mongoose = require('mongoose')
const session = require('session')
const app = require('./app')
const MongoDBStore = require('connect-mongo')(session);
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Database connected'))

const port = process.env.PORT
const secret = process.env.JWT_SECRET || 'S3cr37'

const store = new MongoDBStore({
    url: dbUrl,
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
};
app.use(session(sessionConfig));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})