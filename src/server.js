const ExpressError = require('./utils/ExpressError')
const app = require('./app')

app.get('/', (req, res) => res.render('home'));

app.all('*', (req, res, next) => next(new ExpressError('Page not found.', 404)));

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'HTTP Error 500: an unknown server error has occured.'
    res.status(statusCode).render('error', { err })
})

app.listen(4000, () => console.log('Serving on port 4000'));