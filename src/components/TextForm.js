import React from 'react'
import {useInput} from '../hooks'
import styles from './TextForm.module.css'

export const TextForm = ({onSubmit, placeholder}) => {
  const {input, handleChange, handleSubmit} = useInput('', onSubmit)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
      />

      <button className={styles.button} type="submit">
        add
      </button>
    </form>
  )
}
