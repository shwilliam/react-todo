import React, {useCallback} from 'react'
import {DragToConfirm} from './DragToConfirm'
import {ContentEditable} from './ContentEditable'

const TodoListItem = ({
  id,
  listId,
  title,
  done,
  onComplete,
  onUpdate,
  onDelete,
}) => {
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

  return (
    <li className="todo__container">
      <DragToConfirm
        className="todo"
        onConfirm={handleComplete}
        onCancel={handleDelete}
      >
        <button
          className="button todo__complete"
          onClick={handleComplete}
          type="button"
        >
          {done ? '🔳' : '⬜️'}
        </button>

        <h3 className="todo__title" data-done={done}>
          <ContentEditable value={title} onSave={handleSave} />
        </h3>
      </DragToConfirm>
    </li>
  )
}

export {TodoListItem}
