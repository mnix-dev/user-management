const ExpressError = require('./server/utils/ExpressError')
const app = require('./server/app')
const PORT = process.env.PORT || 3001

if ( process.env.NODE_ENV === 'production') {
    const enforce = require('express-sslify')
    const path = require('path')
    app.use(enforce.HTTPS({ trustProtoHeader: true}))
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.get('/', (req, res) => res.render('home'));

app.all('*', (req, res, next) => next(new ExpressError('Page not found.', 404)));

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'HTTP Error 500: an unknown server error has occured.'
    res.status(statusCode).json({ err })
})

app.listen(PORT);