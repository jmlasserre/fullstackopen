const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, curr) => sum + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  let favoriteBlogIndex = 0
  let mostLikes = 0
  blogs.forEach(b => {
    if (b.likes > mostLikes){
      favoriteBlogIndex = blogs.indexOf(b)
      mostLikes = b.likes
    }
  })
  return blogs[favoriteBlogIndex]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const blogsPerAuthor = _.countBy(blogs, b => b.author)
  const authorMaxCount = _.maxBy(_.toPairs(blogsPerAuthor), ([author, count]) => count)
  return {
    author: authorMaxCount[0],
    blogs: authorMaxCount[1]
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }