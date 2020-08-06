import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { USER_INFO, BOOK_RECOMMENDATION } from '../queries'

const Recommendations = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [ getUserInfo, userInfo ] = useLazyQuery(USER_INFO)
  const [ getBooks, result ] = useLazyQuery(BOOK_RECOMMENDATION)

  // Conditionally get user's favorite genre if user has logged in
  useEffect(() => {
    if (props.token) {
      getUserInfo()
    }
  }, [props.token, getUserInfo])

  // Conditionally set the favorite genre and query the books
  // only after userInfo query has been run
  useEffect(() => {
    if (userInfo.data && props.token) {
      setFavoriteGenre(userInfo.data.me.favoriteGenre)
      getBooks({ variables: { genre: favoriteGenre }})
    }
  }, [userInfo, favoriteGenre, getBooks, props.token])

  
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