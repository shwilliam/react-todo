import React, {useCallback, useState, useMemo} from 'react'
import {TextForm} from './TextForm'
import {TodoList} from './TodoList'
import {CardHeader} from './CardHeader'
import {InteractiveCard, CardContent, Overlay} from './InteractiveCard'
import {ProgressBar} from './ProgressBar'

// TODO: abstract throttled toggle to custom hook
let lastToggle = performance.now()

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
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = useCallback(() => {
    // throttle toggle
    const now = performance.now()
    if (now - lastToggle > 400) {
      setIsOpen(s => !s)
      lastToggle = now
    }
  }, [])
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
  const todosRemaining = todos.filter(({done}) => !done).length
  const todosProgress = useMemo(() => {
    if (!todos || !todos.length) return 0
    const totalTodos = todos.length
    return (totalTodos - todosRemaining) / totalTodos
  }, [todos, todosRemaining])

  return (
    <li className="todo-list__item">
      <Overlay isSelected={isOpen} />

      <InteractiveCard isOpen={isOpen} onToggle={toggleIsOpen}>
        <header className="todo-list__header">
          <CardHeader isSelected={isOpen} onClick={toggleIsOpen}>
            <h2 className="todo-list__title">{title}</h2>
            <p className="todo-list__subtitle">
              {todosRemaining} tasks remaining
            </p>
            <ProgressBar progress={todosProgress} />
          </CardHeader>
        </header>

        <CardContent isOpen={isOpen}>
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
          <TodoList
            data={todos}
            id={id}
            onComplete={onTodoComplete}
            onUpdate={onTodoUpdate}
            onDelete={onTodoDelete}
          />
        </CardContent>
      </InteractiveCard>
    </li>
  )
}

export {TodoListsItem}
