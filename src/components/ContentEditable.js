import React, {useState, useRef, useEffect, useCallback} from 'react'
import {stopEventPropagation} from '../utils'
import styles from './ContentEditable.module.css'

export const ContentEditable = ({
  value = '',
  onEditStart,
  onEditEnd,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState(value)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef(null)

  const handleDoubleClick = useCallback(() => setIsEditing(true), [])

  const handleChange = useCallback(
    e => {
      const inputValue = e.target.value
      setInputValue(inputValue)
      onSave(inputValue)
    },
    [onSave],
  )

  const handleSave = useCallback(() => {
    const inputValue = inputRef.current.value
    setIsEditing(false)
    setInputValue(inputValue)
    onSave(inputValue)
  }, [onSave])

  const handleKeyDown = useCallback(
    e => {
      // save on esc & enter
      if (isEditing && [27, 13].includes(e.keyCode)) {
        handleSave()
      }
    },
    [handleSave, isEditing],
  )

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
      onEditStart()
    } else {
      onEditEnd()
    }
  }, [isEditing, onEditStart, onEditEnd])

  if (isEditing)
    return (
      <input
        type="text"
        className={styles.input}
        ref={inputRef}
        onClick={stopEventPropagation}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        value={inputValue}
        onChange={handleChange}
      />
    )

  return (
    <p className={styles.editable} onDoubleClick={handleDoubleClick}>
      {inputValue || value}
    </p>
  )
}
