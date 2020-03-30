import React, {useCallback, useState, useMemo} from 'react'
import {AnimatePresence} from 'framer-motion'
import {
  ProgressBar,
  TextForm,
  TodoListItem,
  InteractiveCard,
  CardContent,
  CardHeader,
  Overlay,
} from './'

// TODO: abstract throttled toggle to custom hook
let lastToggle = performance.now()

export const InteractiveTodoList = ({
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
    <>
      <Overlay isSelected={isOpen} />

      <InteractiveCard isOpen={isOpen} onToggle={toggleIsOpen}>
        <header className="todo-list__header">
          <CardHeader isSelected={isOpen} onClick={toggleIsOpen}>
            <h2 className="todo-list__title">{title}</h2>
            {todosRemaining > 0 ? (
              <p className="todo-list__subtitle">
                {todosRemaining} task{todosRemaining > 1 ? 's' : ''} remaining
              </p>
            ) : todos.length > 0 ? (
              <p className="todo-list__subtitle">No tasks remaining</p>
            ) : (
              <p className="todo-list__subtitle">Empty list</p>
            )}
            {todosRemaining > 0 && <ProgressBar progress={todosProgress} />}
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

          <ol>
            {todos.map(d => (
              <AnimatePresence key={`todo__${id}--${d.id}`}>
                <TodoListItem
                  listId={id}
                  onComplete={onTodoComplete}
                  onUpdate={onTodoUpdate}
                  onDelete={onTodoDelete}
                  {...d}
                />
              </AnimatePresence>
            ))}
          </ol>
        </CardContent>
      </InteractiveCard>
    </>
  )
}
