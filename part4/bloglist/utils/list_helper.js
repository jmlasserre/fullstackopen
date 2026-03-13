const _ = require('lodash')

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, curr) => sum + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0 || !blogs) return null
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
  if (blogs.length === 0 || !blogs) return null
  const blogsPerAuthor = _.countBy(blogs, b => b.author)
  const authorMaxCount = _.maxBy(_.toPairs(blogsPerAuthor), ([author, count]) => count)
  return {
    author: authorMaxCount[0],
    blogs: authorMaxCount[1]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0 || !blogs) return null
  const likesPerAuthor = (author) => blogs.reduce(
    (sum, curr) => curr.author === author ? sum + curr.likes : sum, 0)
  const blogsPerAuthor = _.groupBy(listWithManyBlogs, blog => blog.author)
  const test = _.zip(Object.keys(blogsPerAuthor), Object.keys(blogsPerAuthor).map(auth => likesPerAuthor(auth)))
  const test2 = _.maxBy(test, ([author, likes]) => likes)
  return {
    author: test2[0],
    likes: test2[1]
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }