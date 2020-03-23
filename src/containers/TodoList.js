import React from 'react'
import {AnimatePresence} from 'framer-motion'
import {TodoListItem} from './TodoListItem'

const TodoList = ({data, id, ...props}) => (
  <ol>
    {data.map(d => (
      <AnimatePresence key={`todo__${id}--${d.id}`}>
        <TodoListItem listId={id} {...d} {...props} />
      </AnimatePresence>
    ))}
  </ol>
)

export {TodoList}
