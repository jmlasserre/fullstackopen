const express = require('express')
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
    console.log('Error connecting to MongoDB: ', e.message)
  })

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app
