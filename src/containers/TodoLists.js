import React from 'react'
import {TodoListsItem} from './TodoListsItem'

const TodoLists = ({data, renderList, ...props}) => (
  <ol className="todo-list">
    {data.map((d, i) => (
      <TodoListsItem key={`todo__${i}`} idx={i} {...d} {...props} />
    ))}
  </ol>
)

export {TodoLists}
