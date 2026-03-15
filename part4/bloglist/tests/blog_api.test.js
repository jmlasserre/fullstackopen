const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

let blog = null

beforeEach(async () => {
  blog = {
    title: 'The Test Blog',
    author: 'jmlasserre',
    url: 'http://example-link.com',
    likes: 50,
  }
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

test('a blog is added to the database', async () => {
  await api.post('/api/blogs').send(blog)
  const blogs = await api.get('/api/blogs')
  const addedBlog = (
    await Blog.find({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    })
  )[0]
  // First verification: blog has effectively been added
  assert.strictEqual(blogs.body.length, testHelper.initialBlogs.length + 1)
  // Verifying that the blog's content was saved successfully
  assert.strictEqual(addedBlog.title, blog.title)
  assert.strictEqual(addedBlog.author, blog.author)
  assert.strictEqual(addedBlog.url, blog.url)
  assert.strictEqual(addedBlog.likes, blog.likes)
})

test('a blog with no likes reverts to 0', async () => {
  blog.likes = undefined
  await api.post('/api/blogs').send(blog)
  const addedBlog = (
    await Blog.find({ title: blog.title, author: blog.author, url: blog.url })
  )[0]
  assert.strictEqual(addedBlog.likes, 0)
})

test.only('a blog with no title returns 400', async () => {
  blog.title = undefined
  await api.post('/api/blogs').send(blog).expect(400)
})

test.only('a blog with no url returns 400', async () => {
  blog.url = undefined
  await api.post('/api/blogs').send(blog).expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
