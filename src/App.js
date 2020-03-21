import React from 'react'
import {TextForm, TodoLists, TodoList} from './containers'
import {useTodoLists} from './hooks'
import shortid from 'shortid'

const initialTodos = [
  {
    id: shortid.generate(),
    title: 'Welcome 👋',
    todos: [
      {
        id: shortid.generate(),
        title: 'Add a new todo list',
        done: true,
      },
      {
        id: shortid.generate(),
        title: 'Add a task',
        done: true,
      },
      {
        id: shortid.generate(),
        title: 'Double-click a task to edit it',
        done: false,
      },
      {
        id: shortid.generate(),
        title: 'Slide a task right to mark as done',
        done: false,
      },
      {
        id: shortid.generate(),
        title: 'Slide it left to delete it',
        done: false,
      },
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
    completeTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
  } = useTodoLists(initialTodos)

  return (
    <>
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
          onTodoComplete={completeTodo}
          onTodoUpdate={updateTodo}
          onTodoDelete={deleteTodo}
          onClearCompleted={clearCompleted}
        />
      </main>
    </>
  )
}

export default App
