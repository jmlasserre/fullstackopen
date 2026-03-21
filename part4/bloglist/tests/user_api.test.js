const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const testHelper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('creating a user', () => {
  test.only('a user is added to the database', async () => {
    await api.post('/api/users').send(testHelper.validUser).expect(201)
  })
  test.only('a user without a username is not added and returns 400', async () => {
    await api.post('/api/users').send(testHelper.invalidUserNoUsername).expect(400)
  })
  test.only('a user with an invalid password is not added and returns 400', async () => {
    await api.post('/api/users').send(testHelper.invalidUserNoPass).expect(400)
  })
  test.only('a user that has already been added cannot be added again and returns 400', async () => {
    await api.post('/api/users').send(testHelper.validUser)
    await api.post('/api/users').send(testHelper.validUser).expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})