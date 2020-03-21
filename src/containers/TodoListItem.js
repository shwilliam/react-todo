import React, {useCallback, useMemo} from 'react'
import {HDraggable} from './HDraggable'
import {ContentEditable} from './ContentEditable'
import {CheckIcon, TrashIcon, CrossIcon} from '../components'
import {useDoubleClick} from '../hooks'

const TodoListItem = ({
  id,
  listId,
  title,
  done,
  onComplete,
  onUpdate,
  onDelete,
}) => {
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
    title => {
      onUpdate(listId, id, title)
    },
    [listId, id, onUpdate],
  )

  const handleClick = useDoubleClick(handleComplete, null)

  return (
    <li className="todo__container">
      <HDraggable
        className="todo"
        onDragRight={handleComplete}
        onDragLeft={handleDelete}
        IconLeft={IconLeft}
        IconRight={TrashIcon}
        colorLeft={colorLeft}
        colorRight="#FF5630"
      >
        <button
          className="button todo__complete"
          onClick={handleComplete}
          type="button"
        >
          {done ? '🔳' : '⬜️'}
        </button>

        <h3 className="todo__title" data-done={done} onClick={handleClick}>
          <ContentEditable value={title} onSave={handleSave} />
        </h3>
      </HDraggable>
    </li>
  )
}

export {TodoListItem}
