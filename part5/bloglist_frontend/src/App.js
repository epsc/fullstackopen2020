import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (status, message) => {
    setNotification({
      status: status,
      message: message
    })

    setTimeout(() => setNotification(null), 5000)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials', exception)
      showNotification(
        'error',
        'Invalid username or password',
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      showNotification(
        'pass',
        `A new blog ${newBlog.title} by ${newBlog.author} added`,
      )
    } catch (exception) {
      showNotification(
        'error',
        `Blog creation failed: ${exception.response.data.error}`,
      )
      console.log(exception)
    }
  }

  const likeBlog = async (id) => {
    try {
    const blog = blogs.find(blog => blog.id === id)
    const likedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const returnedBlog = await blogService.like(id, likedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch (exception) {
      showNotification(
        'error',
        `Failed to update likes: ${exception.response.data.error}`
      )
    }
  }

  const noteForm = () => (
    <Togglable buttonLabel="add blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <LoginForm 
        notification={notification}
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      {noteForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={() => likeBlog(blog.id)} />
      )}
    </div>
  )
}

export default App