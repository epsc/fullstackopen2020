import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  let timeoutId
  const showNotification = (status, message) => {
    dispatch(setNotification({
      status: status,
      message: message
    }))

    // Clear previous setTimeout so that the new notification (if any) would not be cleared earlier than expected
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => dispatch(removeNotification()), 5000)
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

  const addBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))

      blogFormRef.current.toggleVisibility()
      showNotification(
        'pass',
        `A new blog ${blog.title} by ${blog.author} added`,
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
      //setSortedBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch (exception) {
      showNotification(
        'error',
        `Failed to update likes: ${exception.response.data.error}`
      )
    }
  }

  const deleteBlog = async (id) => {
    const deleteBlog = blogs.find(blog => blog.id === id)
    const confirmation = window.confirm(`Delete ${deleteBlog.title} by ${deleteBlog.author}?`)

    if (confirmation) {
      try {
        await blogService.remove(id)
        //setSortedBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))

        showNotification(
          'pass',
          `Successfully deleted ${deleteBlog.title} by ${deleteBlog.author}`
        )
      } catch (exception) {
        showNotification(
          'error',
          `Failed to delete blog post: ${exception.response.data.error}`
        )
      }
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
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    )
  }

  const sortByLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {noteForm()}
      {blogs.sort(sortByLikes).map(blog =>
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          addLike={() => likeBlog(blog.id)}
          deleteBlog={() => deleteBlog(blog.id)}
        />
      )}
    </div>
  )
}

export default App