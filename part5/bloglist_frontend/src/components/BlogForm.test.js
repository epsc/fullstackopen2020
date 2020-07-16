import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler prop and gives it the right values when the form is submitted', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('input[name=title]')
  const author = component.container.querySelector('input[name=author]')
  const url = component.container.querySelector('input[name=url]')
  const form = component.container.querySelector('form')

  // Change form values then submit
  fireEvent.change(title, {
    target: { value: 'A New Title For Testing' }
  })
  fireEvent.change(author, {
    target: { value: 'Thor Au' }
  })
  fireEvent.change(url, {
    target: { value: 'http://fakeUrlForTesting.com/urlValue' }
  })
  fireEvent.submit(form)

  // Check number of calls to the handler and check if the values received are correct
  expect(createBlog.mock.calls).toHaveLength(1)

  const submitted = createBlog.mock.calls[0][0]
  expect(submitted.title).toBe('A New Title For Testing')
  expect(submitted.author).toBe('Thor Au')
  expect(submitted.url).toBe('http://fakeUrlForTesting.com/urlValue')
})