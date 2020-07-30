import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data)
    case 'REMOVE_BLOG':
      return state.filter(blog =>
        blog.id !== action.data.id)
    case 'ADD_BLOG_COMMENT':
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = await blogService.like(blog.id, blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const addCommentToBlog = (id, comment) => {
  return async dispatch => {
    const updatedCommentsBlog = await blogService.addComment(id, comment)

    dispatch({
      type: 'ADD_BLOG_COMMENT',
      data: updatedCommentsBlog
    })
  }
}

export default blogReducer