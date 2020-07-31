import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            value={newTitle}
            name="title"
            onChange={handleTitleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            value={newAuthor}
            name="author"
            onChange={handleAuthorChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            value={newUrl}
            name="url"
            onChange={handleUrlChange}
          />
        </Form.Group>

        <Button id="create-button" variant="outline-success" type="submit">create</Button>
      </Form>
    </div>
  )
}

export default BlogForm