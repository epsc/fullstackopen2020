import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    // if reset button is clicked, the target is the button, and value is the button text 'reset'
    if (event.target.value === 'reset') {
      reset()
    }
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange
  }
}