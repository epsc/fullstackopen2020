const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  // Initial user for required authentication
  const initialUser = await helper.createInitialUser('jdlc', 'password')

  const blogObjects = helper.initialBlogs
    .map(blog => {
      // add user property to initial blogs
      blog.user = initialUser._id
      return new Blog(blog)
    })
  //console.log(blogObjects)
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

test('adding a blog fails with proper status code if token is not provided', async () => {
  const blogsAtStart = await helper.usersInDb()

  const newBlog = {
    title: 'A new blog post',
    author: 'VS Code Rest Client',
    url: 'http://newblogpost.com/newPost',
    likes: 2,
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('invalid token')

  const blogsAtEnd = await helper.usersInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

test('creating a new post is successful with complete input and correct token', async () => {
  const token = await helper.initialUserToken('jdlc')

  const newBlog = {
    title: 'A new blog post',
    author: 'VS Code Rest Client',
    url: 'http://newblogpost.com/newPost',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const endBlogs = await helper.blogListInDb()
  const titles =  endBlogs.map(blogs => blogs.title)

  expect(endBlogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('A new blog post')
})

test('likes default to 0 if the likes property is missing from the POST request', async () => {
  const token = await helper.initialUserToken('jdlc')

  const newBlogNoLikes = {
    title: 'A new blog post',
    author: 'VS Code Rest Client',
    url: 'http://newblogpost.com/newPost',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlogNoLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const addedBlog =response.body[helper.initialBlogs.length]

  expect(addedBlog).toHaveProperty('likes', 0)
})

test('Respond with status 400 Bad Request if title is missing from POST request', async () => {
  const token = await helper.initialUserToken('jdlc')

  const noTitle = {
    author: 'VS Code Rest Client',
    url: 'http://newblogpost.com/newPost',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(noTitle)
    .expect(400)
})

test('Respond with status 400 Bad Request if url is missing from POST request', async () => {
  const token = await helper.initialUserToken('jdlc')

  const noUrl = {
    title: 'A new blog post',
    author: 'VS Code Rest Client',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(noUrl)
    .expect(400)
})

test('single blog entry is successfully deleted', async () => {
  const startBlogs = await helper.blogListInDb()
  const blogToDelete = startBlogs[0]

  const token = await helper.initialUserToken('jdlc')

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const endBlogs = await helper.blogListInDb()

  expect(endBlogs).toHaveLength(helper.initialBlogs.length - 1)

  const ids = endBlogs.map(r => r.id)

  expect(ids).not.toContain(blogToDelete.id)
})

test('likes of a blog entry is successfully increased', async () => {
  const startBlog = helper.initialBlogs[0]

  const updatedBlog = {
    title: startBlog.title,
    author: startBlog.author,
    url: startBlog.url,
    likes: startBlog.likes + 1
  }

  await api
    .put(`/api/blogs/${startBlog._id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const endBlogs = await helper.blogListInDb()
  const endBlogsLikes = endBlogs.map(blog => blog.likes)

  expect(endBlogsLikes).toContain(8)
})

afterAll(() => {
  mongoose.connection.close()
})
