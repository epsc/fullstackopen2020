import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)


  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>loading books...</div>
    )
  }

  const books = result.data.allBooks

  // get genres from all books but remove duplicates (Set is used so that values are unique then returned back to array)
  // Flatmap is used to get from the genre arrays of each book and return a flattened array
  const genres = [ ...new Set(books.flatMap(book => book.genres)) ]

  const filter = (genre) => {
    setGenre(genre)
  }

  const booksToShow = genre
    ? books.filter(book => book.genres.includes(genre))
    : books

  return (
    <div>
      <h2>books</h2>

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
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
          {genres.map(genre => 
            <button
              key={genre}
              onClick={() => filter(genre)}
            >
              {genre}
            </button>
          )}
          <button onClick={() => setGenre(null)}>all genres</button>
        </div>
    </div>
  )
}

export default Books