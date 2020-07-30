import React from 'react'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  const blogBorderStyle = {
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5
  }

  const sortByLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      {blogs.sort(sortByLikes).map(blog =>
        <div
          style={blogBorderStyle}
          key={blog.id}
        >
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

export default Blogs