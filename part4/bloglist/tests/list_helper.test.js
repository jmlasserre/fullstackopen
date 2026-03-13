const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, listWithManyBlogs, listWithEqualMostLikes } = require('./test_helper.js')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of one blog is its likes', () => {
    const totalLikesOneBlog = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(totalLikesOneBlog, listWithOneBlog[0].likes)
  })
  test('of a list with many blogs is their likes summed up', () => {
    const totalLikesManyBlogs = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(totalLikesManyBlogs, 36)
  })
  test('of an empty list is 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
})

describe('favorite blog', () => {
  test('of an empty list is null', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), null)
  })
  test('of a list with a single blog is that blog', () => {
    assert.deepStrictEqual(
      listHelper.favoriteBlog(listWithOneBlog),
      listWithOneBlog[0],
    )
  })
  test('of a list with numerous blogs is the blog with the most likes', () => {
    assert.deepStrictEqual(
      listHelper.favoriteBlog(listWithManyBlogs),
      listWithManyBlogs[2],
    )
  })
  test('of a list where two or more blogs have the maximum amount of likes is any of them', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithEqualMostLikes), listWithEqualMostLikes[0])
  })
})

describe('author with most blogs', () => {
  test('of an empty list is null', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), null)
  })
  test('of a list with many blogs is that author', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithManyBlogs), {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
  test('of a list with a single blog is that blogs author', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
  test('of a list with two or more authors with the most blogs is any of them', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithEqualMostLikes), {
      author: 'Robert C. Martin',
      blogs: 1
    })
  })
})

describe('author with most likes', () => {
  test('of a list with no blogs is null', () => {
    assert.deepStrictEqual(listHelper.mostLikes([]), null)
  })
  test('of a list with one blog is that blogs author', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })
  test('of a list with multiple blogs is the author with the most likes', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithManyBlogs), {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})