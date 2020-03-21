import React, {useCallback} from 'react'
import {TextForm} from './TextForm'
import {TodoList} from './TodoList'
import {Card} from '../components'

const TodoListsItem = ({
  title,
  todos,
  id,
  onListDelete,
  onTodoAdd,
  onTodoComplete,
  onTodoUpdate,
  onTodoDelete,
  onClearCompleted,
}) => {
  const handleTodoAdd = useCallback(value => onTodoAdd(id, value), [
    id,
    onTodoAdd,
  ])
  const handleClearCompleted = useCallback(() => onClearCompleted(id), [
    onClearCompleted,
    id,
  ])
  const handleTodoDelete = useCallback(() => onListDelete(id), [
    onListDelete,
    id,
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
            id={id}
            onComplete={onTodoComplete}
            onUpdate={onTodoUpdate}
            onDelete={onTodoDelete}
          />
        </div>
      </Card>
    </li>
  )
}

export {TodoListsItem}
