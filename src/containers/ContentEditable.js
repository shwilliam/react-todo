import React, {useState, useRef, useEffect, useCallback} from 'react'

const ContentEditable = ({value = '', onSave}) => {
  const [inputValue, setInputValue] = useState(value)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing) inputRef.current.focus()
  }, [isEditing])

  const handleClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleSave = useCallback(() => {
    setIsEditing(false)

    Promise.resolve().then(() => {
      setInputValue(inputRef.current.innerText)
      onSave(inputRef.current.innerText)
    })
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

  return (
    <p
      contentEditable={isEditing}
      suppressContentEditableWarning
      ref={inputRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onBlur={handleSave}
    >
      {inputValue}
    </p>
  )
}

export {ContentEditable}
