import React, {useCallback} from 'react'
import {DragToConfirm} from './DragToConfirm'

const TodoListItem = ({idx, listIdx, title, done, onComplete, onDelete}) => {
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

        <div className="todo__content">
          <h3 className="todo__title" data-done={done}>
            {title}
          </h3>
        </div>
      </DragToConfirm>
    </li>
  )
}

export {TodoListItem}
