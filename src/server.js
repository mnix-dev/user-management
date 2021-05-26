require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})