import React, {useState, useCallback} from 'react'

const Input = ({onSubmit, placeholder}) => {
  const [titleInput, setTitleInput] = useState('')

  const handleChange = useCallback(e => setTitleInput(e.target.value), [])

  const handleSubmit = useCallback(
    e => {
      onSubmit(titleInput)
      setTitleInput('')
      e.preventDefault()
    },
    [onSubmit, titleInput],
  )

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={titleInput}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </form>
  )
}

export default Input
