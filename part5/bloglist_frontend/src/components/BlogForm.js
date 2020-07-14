import React from 'react'

const BlogForm = (props) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={props.addBlog}>
        <div>
          title:
          <input 
            type="text"
            value={props.newTitle}
            name="title"
            onChange={props.handleTitleChange}
          />
        </div>

        <div>
          author:
          <input 
            type="text"
            value={props.newAuthor}
            name="title"
            onChange={props.handleAuthorChange}
          />
        </div>

        <div>
          url:
          <input 
            type="text"
            value={props.newUrl}
            name="title"
            onChange={props.handleUrlChange}
          />
        </div>
        <button type="submit">create</button>

      </form>
    </div>
  )
}

export default BlogForm