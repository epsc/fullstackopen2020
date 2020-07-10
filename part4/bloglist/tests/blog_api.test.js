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

afterAll(() => {
  mongoose.connection.close()
})
