const dns = require('node:dns/promises')
dns.setServers(['1.1.1.1'])
require('dotenv').config()
const express = require('express')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const MONGODB_URI = process.env.MONGODB_URI

const app = express()

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch((e) => {
    console.log(MONGODB_URI, 'Error connecting to MongoDB: ', e.message)
  })

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(middleware.errorHandler)

module.exports = app
