const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlogs)
})

const api = supertest(app)

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const blogs = await api.get('/api/blogs')
  assert.strictEqual(blogs.body.length, testHelper.initialBlogs.length)
})

test.only('all blogs have an id', async () => {
    const blogs = await api.get('/api/blogs')
    assert.strictEqual(blogs.body.every(blog => Object.hasOwn(blog, 'id') && !Object.hasOwn(blog, '_id')), true)
})

after(async () => {
    await mongoose.connection.close()
})
