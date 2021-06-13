const ExpressError = require('./utils/ExpressError')
const app = require('./app')
const PORT = process.env.PORT || 3001

app.get('/', (req, res) => res.render('home'));

app.all('*', (req, res, next) => next(new ExpressError('Page not found.', 404)));

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'HTTP Error 500: an unknown server error has occured.'
    res.status(statusCode).json({ err })
})

app.listen(PORT);