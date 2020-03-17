import React from 'react'
import {Input, Card} from './components'
import {useTodoLists} from './hooks'

const App = () => {
  const {todoLists, totalTodos, addTodoList, addTodo} = useTodoLists([
    {title: 'Hello world', todos: []},
  ])

  return (
    <div>
      <header>
        <h1>React Todo</h1>
      </header>

      <main>
        <Input onSubmit={addTodoList} placeholder="New todo list" />

        <p>You have {totalTodos} tasks</p>

        <ol>
          {todoLists.map(({title, todos}, i) => (
            <li key={`todo-list__${i}`}>
              <Card>
                <h2>{title}</h2>
                <Input
                  onSubmit={value => addTodo(i, value)} // FIXME
                  placeholder="New todo"
                />
                <ol>
                  {todos.map(({title}, i) => (
                    <li key={`todo__${i}`}>{title}</li>
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
