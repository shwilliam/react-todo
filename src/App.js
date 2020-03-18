import React from 'react'
import {TextForm, TodoLists, TodoList} from './containers'
import {useTodoLists} from './hooks'

const initialTodos = [
  {
    title: 'Welcome 👋',
    todos: [
      {title: 'Add a new todo list', done: false},
      {title: 'Add a task', done: false},
      {title: 'Mark task as done', done: false},
    ],
  },
]

const App = () => {
  const {
    todoLists,
    totalTodos,
    addTodoList,
    deleteTodoList,
    addTodo,
    deleteTodo,
    completeTodo,
    clearCompleted,
  } = useTodoLists(initialTodos)

  return (
    <div>
      <header className="site__header">
        <h1 className="site__title">React Todo</h1>
        <p>You have {totalTodos} tasks</p>
      </header>

      <main className="site__main">
        <TextForm onSubmit={addTodoList} placeholder="Add a list..." />

        <TodoLists
          data={todoLists}
          renderList={TodoList}
          onListDelete={deleteTodoList}
          onTodoAdd={addTodo}
          onTodoDelete={deleteTodo}
          onTodoComplete={completeTodo}
          onClearCompleted={clearCompleted}
        />
      </main>
    </div>
  )
}

export default App
