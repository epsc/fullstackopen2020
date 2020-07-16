import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Testing the frontend',
      author: 'Tester One',
      url: 'http://test.ing/',
      likes: 5
    }

    const user = {
      username: 'user1',
      name: 'Re Su',
    }

    const addLike = jest.fn()
    const deleteBlog = jest.fn()

    component = render(
      <Blog
        blog={blog}
        user={user}
        addLike={addLike}
        deleteBlog={deleteBlog}
      />
    )
  })

  test('renders blog title and author', () => {
    expect(component.container).toHaveTextContent('Testing the frontend')
    expect(component.container).toHaveTextContent('Tester One')
  })

  test('does not display the div with the url or number of likes at the start', () => {
    const div = component.container.querySelector('.hideable')

    // check if url and likes are properly in this hideable div, title shouldn't be in
    expect(div).toHaveTextContent('http://test.ing')
    expect(div).toHaveTextContent('likes 5')
    expect(div).not.toHaveTextContent('Testing the frontend')

    expect(div).toHaveStyle('display: none')
  })
})
