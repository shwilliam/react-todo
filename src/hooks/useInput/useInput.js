import {useState, useCallback} from 'react'

const useInput = (initialValue = '', onSubmit = () => {}) => {
  const [input, setInput] = useState(initialValue)

  const handleChange = useCallback(e => setInput(e.target.value), [])

  const handleSubmit = useCallback(
    e => {
      onSubmit(input)
      setInput('')
      e.preventDefault()
    },
    [onSubmit, input],
  )

  return {input, handleChange, handleSubmit}
}

export {useInput}
