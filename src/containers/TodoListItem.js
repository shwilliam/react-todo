import React, {useCallback} from 'react'

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
    <li key={`todo__${idx}`} className="todo__container">
      <button
        className="button todo__complete"
        onClick={handleComplete}
        type="button"
      >
        {done ? '🔳' : '⬜️'}
      </button>

      <div className="todo">
        <h3 className="todo__title" data-done={done} onClick={handleComplete}>
          {title}
        </h3>

        <button className="button" onClick={handleDelete} type="button">
          delete
        </button>
      </div>
    </li>
  )
}

export {TodoListItem}
