import {useState, useCallback} from 'react'

const useInput = (initialValue = '', onSubmit = () => {}) => {
  const [input, setInput] = useState(initialValue)

  const handleChange = useCallback(e => setInput(e.target.value), [])

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      const inputValue = input.trim()

      if (!inputValue.length) return

      onSubmit(inputValue)
      setInput('')
    },
    [onSubmit, input],
  )

  return {input, handleChange, handleSubmit}
}

export {useInput}
