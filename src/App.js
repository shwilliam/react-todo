import React from 'react'
import {TodoListSelector, PlusIcon} from './components'
import {useTodoLists} from './hooks'
import styles from './App.module.css'

const App = () => {
  const {
    todoLists,
    totalTodos,
    addTodoList,
    deleteTodoList,
    renameTodoList,
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

        <button className={styles.new} onClick={addTodoList}>
          <span className="sr-only">Add a list</span>
          <PlusIcon />
        </button>
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
          onTodoListRename={renameTodoList}
        />
      </main>
    </div>
  )
}

export default App
