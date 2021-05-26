const express = require('express')
const app = express()

const routes = require('./routes/')

app.use(express.json({ limit: '10kb'}))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(express.raw({type: 'application/json'}))
app.use(routes)

module.exports = app