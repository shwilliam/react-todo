import React from 'react'
import {TodoListSelector, TextForm} from './components'
import {useTodoLists} from './hooks'
import styles from './App.module.css'

const App = () => {
  const {
    todoLists,
    totalTodos,
    addTodoList,
    deleteTodoList,
    addTodo,
    completeTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
  } = useTodoLists()

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>React Todo</h1>
        <p>You have {totalTodos} tasks</p>

        <div className={styles.actions}>
          <TextForm onSubmit={addTodoList} placeholder="Add a list..." />
        </div>
      </header>

      <main className={styles.main}>
        <TodoListSelector
          data={todoLists}
          onListDelete={deleteTodoList}
          onTodoAdd={addTodo}
          onTodoComplete={completeTodo}
          onTodoUpdate={updateTodo}
          onTodoDelete={deleteTodo}
          onClearCompleted={clearCompleted}
        />
      </main>
    </div>
  )
}

export default App
