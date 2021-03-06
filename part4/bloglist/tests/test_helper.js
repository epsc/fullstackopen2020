const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  { _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const blogListInDb = async () => {
  const blogList = await Blog.find({})

  return blogList.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})

  return users.map(users => users.toJSON())
}


const createInitialUser = async (username, password) => {
  // Clear user database first
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, passwordHash })

  const dbUser = await user.save()
  return dbUser
}

const initialUserToken = async (username) => {
  const dbUser = await User.findOne({ username })

  const userForToken = {
    username: dbUser.username,
    id: dbUser._id
  }

  return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = {
  initialBlogs,
  blogListInDb,
  usersInDb,
  createInitialUser,
  initialUserToken
}