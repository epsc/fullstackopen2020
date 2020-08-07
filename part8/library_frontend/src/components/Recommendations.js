import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { USER_INFO, ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [ getUserInfo, userInfo ] = useLazyQuery(USER_INFO)
  const [ getBooks, result ] = useLazyQuery(ALL_BOOKS)

  // Conditionally get user's favorite genre if user has logged in
  useEffect(() => {
    if (props.token) {
      // this condition is to fix bug when logging in after logging out.
      // userInfo already has content in this case so just using getUserInfo() doesn't work
      if (userInfo.data?.me === null) {
        userInfo.refetch()
      } else {
        getUserInfo()
      }
    }
  }, [props.token]) //eslint-disable-line

  // Conditionally set the favorite genre and query the books
  // only after userInfo query has been run
  useEffect(() => {
    if (userInfo.data?.me && props.token) {
      setFavoriteGenre(userInfo.data.me.favoriteGenre)
      getBooks({ variables: { genre: userInfo.data.me.favoriteGenre }})
    }
  }, [userInfo.data, props.token, getBooks])
  
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations