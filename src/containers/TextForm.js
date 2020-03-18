import React from 'react'
import {useInput} from '../hooks'

const TextForm = ({onSubmit, placeholder}) => {
  const {input, handleChange, handleSubmit} = useInput('', onSubmit)

  return (
    <form className="text-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input text-form__input"
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
      />

      <button className="button" type="submit">
        add
      </button>
    </form>
  )
}

export {TextForm}
