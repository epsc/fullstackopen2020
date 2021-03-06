const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid ' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  // Populate user field after saving so that response format is consistent with other routes
  await savedBlog.populate('user', { username: 1, name: 1, id: 1 }).execPopulate()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'unauthorized to delete this blog post' })
  }

  await Blog.findByIdAndDelete(request.params.id)   // can also use blog.remove() since it was already loaded into blog param
  user.blogs = user.blogs.filter(blog => blog._id.toString() !== request.params.id.toString())

  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment

  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(comment)

  const blogWithNewComment = await blog.save()
  await blogWithNewComment.populate('user', { username: 1, name: 1, id: 1 }).execPopulate()

  response.json(blogWithNewComment)
})

module.exports = blogsRouter