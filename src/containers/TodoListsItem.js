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
    <li className="todo-list__item">
      <Card>
        <header className="todo-list__header">
          <h2 className="todo-list__title">{title}</h2>

          <div className="todo-list__actions-container">
            <TextForm onSubmit={handleTodoAdd} placeholder="Add a task..." />

            <div className="todo-list__action">
              <button
                className="button todo-list__action"
                onClick={handleClearCompleted}
                type="button"
              >
                clear completed
              </button>

              <button
                className="button todo-list__action"
                onClick={handleTodoDelete}
                type="button"
              >
                delete list
              </button>
            </div>
          </div>
        </header>

        <div className="todo-list__content">
          <TodoList
            data={todos}
            idx={idx}
            onDelete={onTodoDelete}
            onComplete={onTodoComplete}
          />
        </div>
      </Card>
    </li>
  )
}

export {TodoListsItem}
