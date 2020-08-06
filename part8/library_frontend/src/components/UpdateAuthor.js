import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const UpdateAuthor = (props) => {
  const [selected, setSelected] = useState('')
  const [year, setYear] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [ changeBirthyear ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>loading authors...</div>
    )
  }

  const options = result.data.allAuthors
    .map(author => {
      return ({
        value: author.name,
        label: author.name
      })
    })

  const submit = async (event) => {
    event.preventDefault()
    
    await changeBirthyear({ variables: {
      name: selected.value, 
      year: parseInt(year) 
    }})

    setSelected('')
    setYear('')
    props.setPage('authors')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          value={selected}
          options={options}
          onChange={(selected) => setSelected(selected)}
        />
        <div>
          born <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor