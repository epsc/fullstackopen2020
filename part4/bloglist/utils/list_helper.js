const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, value) => {
    return sum + value
  }

  return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  // If blogs list is empty
  if (blogs.length === 0) {
    return null
  }

  // sort in descending order, get first element
  const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

  const favoriteBlog = {
    title: sortedByLikes[0].title,
    author: sortedByLikes[0].author,
    likes: sortedByLikes[0].likes
  }

  return favoriteBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}