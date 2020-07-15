import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const viewButtonLabel = visible ? 'hide' : 'view'

  // Some of the default blog posts have no user, this is to assign a default value in this case.
  // Should be unecessary, and could be removed once those are removed from db.
  const username = blog.user ? blog.user.name : "No user"

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

  return (
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{viewButtonLabel}</button>
    </div>

    <div style={showWhenVisible}>
      {blog.url} <br />
      likes {blog.likes} 
      <button onClick={addLike}>
        like
      </button>
      <br />
      {username}
    </div>
  </div>
  )
}

export default Blog
