import React from 'react'
import {TodoListSelector, TextForm} from './components'
import {useTodoLists} from './hooks'

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
    <div className="site__container">
      <header className="site__header">
        <h1 className="site__title">React Todo</h1>
        <p>You have {totalTodos} tasks</p>

        <div className="site__header-actions">
          <TextForm onSubmit={addTodoList} placeholder="Add a list..." />
        </div>
      </header>

      <main className="site__main">
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
