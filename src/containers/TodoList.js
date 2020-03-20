import React from 'react'
import {TodoListItem} from './TodoListItem'

const TodoList = ({data, idx, ...props}) => (
  <ol className="todos">
    {data.map((d, i) => (
      <TodoListItem
        key={`todo__${idx}--${i}`}
        listIdx={idx}
        idx={i}
        {...d}
        {...props}
      />
    ))}
  </ol>
)

export {TodoList}
