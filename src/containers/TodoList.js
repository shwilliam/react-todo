import React from 'react'
import {TodoListItem} from './TodoListItem'

const TodoList = ({data, id, ...props}) => (
  <ol className="todos">
    {data.map(d => (
      <TodoListItem
        key={`todo__${id}--${d.id}`}
        listId={id}
        {...d}
        {...props}
      />
    ))}
  </ol>
)

export {TodoList}
