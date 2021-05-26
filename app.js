require('dotenv').config()
const express = require('express')

const app = express()

const routes = require('./routes/')
const port = process.env.PORT

app.use(routes)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})