import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER_INFO } from '../queries'

const Recommendations = (props) => {
  const response = useQuery(USER_INFO)
  const responseBooks = useQuery(ALL_BOOKS)


  if (!props.show) {
    return null
  }

  const favoriteGenre = response.data.me.favoriteGenre
  const books = responseBooks.data.allBooks
    .filter(book => book.genres.includes(favoriteGenre))


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