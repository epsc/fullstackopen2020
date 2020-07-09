const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // Uses Lodash. Need to review this part.

  // // Count number of blogs each author has (this returns an object with "author" : amount properties)
  // const countBlogs = _.countBy(blogs, 'author')
  // // Convert the object above to a key-value pair array list (so we can iterate through it)
  // const pairs = _.toPairs(countBlogs)
  // // Find the key value pair with the highest amount using the second element of a key-value pair as iteratee
  // const max = _.maxBy(pairs, pair => {
  //   return pair[1]
  // })

  // This is the above ^ without using variables
  const max = _.maxBy(_.toPairs(_.countBy(blogs, 'author')), authorCountPair => authorCountPair[1])

  const mostBlogs = {
    author: max[0],
    blogs: max[1]
  }

  return mostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let likesList = []
  let authorIndex = null

  blogs
    .forEach(blog => {
      // Update likes count if the author is already in the list, otherwise append the author and count to the list
      if (likesList.map(likes => likes.author).includes(blog.author)) {
        authorIndex = likesList.findIndex(likes => likes.author === blog.author)
        likesList[authorIndex].likes += blog.likes
      } else {
        likesList = likesList.concat(blog)
      }
    })

  // Get the author with the highest likes
  const max = _.maxBy(likesList, data => data.likes)

  // Extract only the author and likes from the data
  const mostLikes = {
    author: max.author,
    likes: max.likes
  }

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}