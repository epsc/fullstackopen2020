import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/currentUserReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.currentUser)

  const dispatch = useDispatch()
  const history = useHistory()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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
      dispatch(setUser(user))
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
    dispatch(clearUser())
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

  const handleLikeBlog = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id)
      const likedBlog = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      }

      dispatch(likeBlog(likedBlog))
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
        dispatch(removeBlog(id))

        history.push('/')

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

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null


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

  return (
    <div className="container">
      <NavigationBar
        user={user}
        handleLogout={handleLogout}
      />
      <Notification />

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog
            user={user}
            blog={blog}
            addLike={() => handleLikeBlog(blog.id)}
            deleteBlog={() => deleteBlog(blog.id)}
            showNotification={showNotification}
          />
        </Route>
        <Route path="/">
          {noteForm()}
          <Blogs blogs={blogs} />
        </Route>
      </Switch>
    </div>
  )
}

export default App