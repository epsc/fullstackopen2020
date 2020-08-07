
import React, { useState, useEffect } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import UpdateAuthor from './components/UpdateAuthor'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} by ${addedBook.author.name} added`)
    }
  })

  useEffect(() => {
    const libraryToken = localStorage.getItem('libraryApp-user-token')
    if (libraryToken) {
      setToken(libraryToken)
    }
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('libraryApp-user-token')
    client.resetStore()

    // redirect to a different page if logging out when viewing a page that requires login
    if (page === 'add' || page === 'updateAuthor' || page === 'recommend') {
      setPage('authors')
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        { token ? (
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('updateAuthor')}>update author</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setPage={setPage}
      />

      <UpdateAuthor
        show={page === 'updateAuthor'}
        setPage={setPage}
      />

      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
      />

      <Recommendations
        show={page === 'recommend'}
        token={token}
      />

    </div>
  )
}

export default App