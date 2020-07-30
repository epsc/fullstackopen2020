import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  // to remove error when navigating directly to single user route and data has not been received yet
  if (!blog) {
    return null
  }

  // Some of the default blog posts have no user, this is to assign a default value in this case to avoid undefined error
  // Should be unecessary, and could be removed (remember to replace variables where it is used) once those are removed from db.
  const blogUser = blog.user ? blog.user.name : 'No user'
  const blogUsername = blog.user ? blog.user.username : 'No id'

  // Only display if the blog was posted by the currently logged in user (delete button)
  const showForBlogPosterOnly = { display: user.username === blogUsername ? '' : 'none' }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br/>

      {blog.likes} likes
      <button id="like-button" onClick={addLike}>like</button>
      <br/>

      added by {blogUser}
      <br/>

      <button
        id="delete-button"
        style={showForBlogPosterOnly}
        onClick={deleteBlog}
      >
        delete
      </button>
    </div>
  )
}

Blog.propTypes = {
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
