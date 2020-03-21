import React, {useCallback} from 'react'
import {DragToConfirm} from './DragToConfirm'
import {ContentEditable} from './ContentEditable'

const TodoListItem = ({
  idx,
  listIdx,
  title,
  done,
  onComplete,
  onUpdate,
  onDelete,
}) => {
  const handleDelete = useCallback(() => onDelete(listIdx, idx), [
    onDelete,
    listIdx,
    idx,
  ])

  const handleComplete = useCallback(() => onComplete(listIdx, idx, !done), [
    onComplete,
    listIdx,
    idx,
    done,
  ])

  const handleSave = useCallback(
    title => {
      onUpdate(listIdx, idx, title)
    },
    [listIdx, idx, onUpdate],
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
