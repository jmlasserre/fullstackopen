const { test, after, beforeEach, describe } = require('node:test')
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

describe('getting blogs', () => {
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
})

describe('adding blogs', () => {
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

  test('a blog with no title returns 400', async () => {
    blog.title = undefined
    await api.post('/api/blogs').send(blog).expect(400)
  })

  test('a blog with no url returns 400', async () => {
    blog.url = undefined
    await api.post('/api/blogs').send(blog).expect(400)
  })
})

describe('deleting a blog', () => {
  test('deleting a blog removes it from the database', async () => {
    const blogs = await api.get('/api/blogs')
    const blogToDelete = blogs.body[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const newBlogs = await api.get('/api/blogs')
    const ids = newBlogs.body.map((b) => b.id)
    assert(!ids.includes(blogToDelete.id))
    assert.strictEqual(newBlogs.body.length, blogs.body.length - 1)
  })

  test('deleting a badly-formatted id returns a 400', async () => {
    const fakeId = 'iamnotanid'
    await api.delete(`/api/blogs/${fakeId}`).expect(400)
  })

  test('deleting a non-existent blog returns a 404', async () => {
    const invalidId = '5a422a851b54a676234d17f0'
    await api.delete(`/api/blogs/${invalidId}`).expect(404)
  })

})

after(async () => {
  await mongoose.connection.close()
})
