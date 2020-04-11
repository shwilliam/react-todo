import React, {useCallback, useState, useMemo, useEffect, useRef} from 'react'
import {Scroll} from 'framer'
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
import styles from './InteractiveTodoList.module.css'

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
  onTodoListRename,
  _demo,
}) => {
  const [state, setState] = useState(_demo ? 'CLOSED' : 'CREATE')
  const titleRef = useRef()

  const toggleIsOpen = useCallback(() => {
    // throttle toggle
    const now = performance.now()
    if (now - lastToggle > 400) {
      setState(s => (['CREATE', 'OPEN'].includes(s) ? 'CLOSED' : 'OPEN'))
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
  const handleNameChange = useCallback(
    e => {
      onTodoListRename(id, e.target.innerText || 'Untitled')
      setState('OPEN')
    },
    [onTodoListRename, id],
  )
  const handleNameKeyDown = e => {
    if (e.key === 'Enter') handleNameChange(e)
  }
  const todosRemaining = todos.filter(({done}) => !done).length
  const todosProgress = useMemo(() => {
    if (!todos || !todos.length) return 0
    const totalTodos = todos.length
    return (totalTodos - todosRemaining) / totalTodos
  }, [todos, todosRemaining])

  useEffect(() => {
    if (title !== '') {
      titleRef.current.focus()
    }
  }, [title])

  return (
    <>
      <Overlay isSelected={['CREATE', 'OPEN'].includes(state)} />

      <InteractiveCard
        isOpen={['CREATE', 'OPEN'].includes(state)}
        state={state}
        onToggle={toggleIsOpen}
      >
        <header className={styles.header}>
          <CardHeader state={state} onClick={toggleIsOpen}>
            <h2
              className={styles.title}
              ref={titleRef}
              contentEditable={state === 'CREATE'}
              onBlur={handleNameChange}
              onKeyDown={handleNameKeyDown}
            >
              {(state !== 'CREATE' || _demo) && title}
            </h2>
            {todosRemaining > 0 ? (
              <p className={styles.subtitle}>
                {todosRemaining} task{todosRemaining > 1 ? 's' : ''} remaining
              </p>
            ) : todos.length > 0 ? (
              <p className={styles.subtitle}>No tasks remaining</p>
            ) : (
              <p className={styles.subtitle}>Empty list</p>
            )}
            <div className={styles.progress}>
              {todos.length > 0 && <ProgressBar progress={todosProgress} />}
            </div>
          </CardHeader>
        </header>

        <CardContent isOpen={state === 'OPEN'}>
          <div className={styles.actions}>
            <TextForm onSubmit={handleTodoAdd} placeholder="Add a task..." />

            <button
              className={styles.action}
              onClick={handleClearCompleted}
              type="button"
            >
              clear completed
            </button>

            <button
              className={styles.action}
              onClick={handleTodoDelete}
              type="button"
            >
              delete list
            </button>
          </div>
          {todos.length ? (
            <Scroll style={{width: '100%', height: '50vh'}}>
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
            </Scroll>
          ) : null}
        </CardContent>
      </InteractiveCard>
    </>
  )
}
