import React from 'react'
import {useInput} from '../../hooks'

const Input = ({onSubmit, placeholder}) => {
  const {input, handleChange, handleSubmit} = useInput('', onSubmit)

  return (
    <form onSubmit={handleSubmit}>
      <input value={input} onChange={handleChange} placeholder={placeholder} />
    </form>
  )
}

export {Input}
