import React, {useCallback, useMemo, useState} from 'react'
import {HDraggable} from './HDraggable'
import {ContentEditable} from './ContentEditable'
import {CheckIcon, TrashIcon, CrossIcon} from '../components'
import {useDoubleClick} from '../hooks'

const TodoListItem = ({
  id,
  listId,
  label,
  done,
  onComplete,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const IconLeft = useMemo(() => (done ? CrossIcon : CheckIcon), [done])
  const colorLeft = useMemo(() => (done ? '#FFAB00' : '#36B37E'), [done])

  const handleDelete = useCallback(() => onDelete(listId, id), [
    onDelete,
    listId,
    id,
  ])

  const handleComplete = useCallback(() => onComplete(listId, id, !done), [
    onComplete,
    listId,
    id,
    done,
  ])

  const handleSave = useCallback(
    label => {
      onUpdate(listId, id, label)
    },
    [listId, id, onUpdate],
  )

  const handleClick = useDoubleClick(handleComplete, null)

  const handleEditStart = useCallback(() => setIsEditing(true), [])

  const handleEditEnd = useCallback(() => setIsEditing(false), [])

  return (
    <li className="todo__container">
      <HDraggable
        className="todo"
        disabled={isEditing}
        onDragRight={handleComplete}
        onDragLeft={handleDelete}
        IconLeft={IconLeft}
        IconRight={TrashIcon}
        colorLeft={colorLeft}
        colorRight="#FF5630"
      >
        <input
          type="checkbox"
          id={`todo__complete--${id}`}
          className="sr-only checkbox"
          checked={done}
          onChange={handleComplete}
        />
        <label htmlFor={`todo__complete--${id}`} className="label">
          <span className="sr-only">Mark as {done ? 'to do' : 'done'}</span>
          <span className="label__icon todo__complete">{done ? '◉' : '◎'}</span>
        </label>

        <h3 className="todo__label" data-done={done} onClick={handleClick}>
          <ContentEditable
            value={label}
            onEditStart={handleEditStart}
            onEditEnd={handleEditEnd}
            onSave={handleSave}
          />
        </h3>
      </HDraggable>
    </li>
  )
}

export {TodoListItem}
