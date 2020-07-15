import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const viewButtonLabel = visible ? 'hide' : 'view'

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const username = blog.user ? blog.user.name : "No user"
  return (
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{viewButtonLabel}</button>
    </div>

    <div style={showWhenVisible}>
      {blog.url} 
      <br />
      likes {blog.likes} <button>like</button>
      <br />
      {username}
    </div>
  </div>
  )
}

export default Blog
