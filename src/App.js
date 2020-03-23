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
        label: 'Add a new todo list',
        done: true,
      },
      {
        id: shortid.generate(),
        label: 'Add a task',
        done: true,
      },
      {
        id: shortid.generate(),
        label: 'Double-click a task to edit it',
        done: false,
      },
      {
        id: shortid.generate(),
        label: 'Tap or slide a task right to mark as done',
        done: false,
      },
      {
        id: shortid.generate(),
        label: 'Slide it left to delete it',
        done: false,
      },
      {
        id: shortid.generate(),
        label: 'Slide the list up or down to dismiss it',
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
    <div className="site__container">
      <header className="site__header">
        <h1 className="site__title">React Todo</h1>
        <p>You have {totalTodos} tasks</p>

        <div className="site__header-actions">
          <TextForm onSubmit={addTodoList} placeholder="Add a list..." />
        </div>
      </header>

      <main className="site__main">
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
    </div>
  )
}

export default App
