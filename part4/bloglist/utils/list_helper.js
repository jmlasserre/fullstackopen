const dummy = (blogs) => {
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

module.exports = { dummy, totalLikes, favoriteBlog }