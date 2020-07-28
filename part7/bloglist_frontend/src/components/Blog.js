import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const viewButtonLabel = visible ? 'hide' : 'view'

  // Some of the default blog posts have no user, this is to assign a default value in this case to avoid undefined error
  // Should be unecessary, and could be removed (remember to replace variables where it is used) once those are removed from db.
  const blogUser = blog.user ? blog.user.name : 'No user'
  const blogUsername = blog.user ? blog.user.username : 'No id'

  // Only display blog if
  const showForBlogPosterOnly = { display: user.username === blogUsername ? '' : 'none' }

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
        <button id="view-button" onClick={toggleVisibility}>{viewButtonLabel}</button>
      </div>

      <div style={showWhenVisible} className="hideable">
        {blog.url} <br />
        likes {blog.likes}
        <button id="like-button" onClick={addLike}>like</button><br />
        {blogUser}<br />
        <button
          id="delete-button"
          style={showForBlogPosterOnly}
          onClick={deleteBlog}
        >
          delete
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
