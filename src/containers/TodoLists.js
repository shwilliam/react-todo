import React from 'react'
import {TodoListsItem} from './TodoListsItem'

const TodoLists = ({data, renderList, ...props}) => (
  <ol className="todo-list">
    {data.map(d => (
      <TodoListsItem key={`todo__${d.id}`} {...d} {...props} />
    ))}
  </ol>
)

export {TodoLists}
