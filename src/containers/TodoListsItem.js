import React, {useCallback} from 'react'
import {TextForm} from './TextForm'
import {TodoList} from './TodoList'
import {Card} from '../components'

const TodoListsItem = ({
  title,
  todos,
  idx,
  onListDelete,
  onTodoAdd,
  onTodoDelete,
  onTodoComplete,
  onClearCompleted,
}) => {
  const handleTodoAdd = useCallback(value => onTodoAdd(idx, value), [
    idx,
    onTodoAdd,
  ])
  const handleClearCompleted = useCallback(() => onClearCompleted(idx), [
    onClearCompleted,
    idx,
  ])
  const handleTodoDelete = useCallback(() => onListDelete(idx), [
    onListDelete,
    idx,
  ])

  return (
    <li>
      <Card>
        <h2 className="todo-list__title">{title}</h2>

        <TextForm onSubmit={handleTodoAdd} placeholder="Add a task..." />

        <div className="todo-list__actions">
          <button
            className="button"
            onClick={handleClearCompleted}
            type="button"
          >
            clear completed
          </button>

          <button className="button" onClick={handleTodoDelete} type="button">
            delete list
          </button>
        </div>

        <TodoList
          data={todos}
          idx={idx}
          onDelete={onTodoDelete}
          onComplete={onTodoComplete}
        />
      </Card>
    </li>
  )
}

export {TodoListsItem}
