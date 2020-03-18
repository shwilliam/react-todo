import React from 'react'
import {Input, Card} from './components'
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
      <header>
        <h1>React Todo</h1>
      </header>

      <main>
        <Input onSubmit={addTodoList} placeholder="Add a list..." />

        <p>You have {totalTodos} tasks</p>

        <ol className="todo-list">
          {todoLists.map(({title, todos}, listIdx) => (
            <li key={`todo-list__${listIdx}`}>
              <Card>
                <h2>{title}</h2>

                <button
                  className="button"
                  onClick={() => clearCompleted(listIdx)} // FIXME
                  type="button"
                >
                  clear completed
                </button>
                <button
                  className="button"
                  onClick={() => deleteTodoList(listIdx)} // FIXME
                  type="button"
                >
                  delete list
                </button>
                <Input
                  onSubmit={value => addTodo(listIdx, value)} // FIXME
                  placeholder="Add a task..."
                />
                <ol className="todos">
                  {todos.map(({title, done}, todoIdx) => (
                    <li key={`todo__${todoIdx}`} className="todo">
                      <header>
                        <button
                          className="todo__complete"
                          onClick={() => completeTodo(listIdx, todoIdx, !done)} // FIXME
                          type="button"
                        >
                          {done ? '🔳' : '⬜️'}
                        </button>

                        {/* FIXME: make button label */}
                        <h3 className="todo__title" data-done={done}>
                          {title}
                        </h3>
                      </header>

                      <button
                        className="button"
                        onClick={() => deleteTodo(listIdx, todoIdx)} // FIXME
                        type="button"
                      >
                        delete
                      </button>
                    </li>
                  ))}
                </ol>
              </Card>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}

export default App
