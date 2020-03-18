import React from 'react'
import {TodoListsItem} from './TodoListsItem'

const TodoLists = ({data, renderList, ...props}) => (
  <ol className="todo-list">
    {data.map((d, i) => (
      <TodoListsItem key={`todo-list--${i}`} idx={i} {...d} {...props} />
    ))}
  </ol>
)

export {TodoLists}
