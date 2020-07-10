const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blog posts are retrieved', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog entry id is defined as id, not as _id', async () => {
  const response = await api.get('/api/blogs')
  const retrievedBlog = response.body[0]

  expect(retrievedBlog.id).toBeDefined()
  expect(retrievedBlog._id).not.toBeDefined()
})

test('blog entry is successfully created', async () => {
  const newBlog = {
    title: 'A new blog post',
    author: 'VS Code Rest Client',
    url: 'http://newblogpost.com/newPost',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  // last index is of array is length - 1. New array length is + 1 so last index is now equal to previous length value
  const addedBlog = response.body[helper.initialBlogs.length]

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(addedBlog).toHaveProperty('title', 'A new blog post')
  expect(addedBlog).toHaveProperty('author', 'VS Code Rest Client')
  expect(addedBlog).toHaveProperty('url', 'http://newblogpost.com/newPost')
})

afterAll(() => {
  mongoose.connection.close()
})
