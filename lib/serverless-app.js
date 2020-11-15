const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const helmet = require('helmet')
app.use(helmet())

const mongoose = require('mongoose')
mongoose.connect(process.env.DB,
    { useNewUrlParser: true,
      useUnifiedTopology: true
    });
const routes = require('./routes/serverless-router')
app.use('/api', routes)

module.exports = app