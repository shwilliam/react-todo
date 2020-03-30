import React from 'react'
import {
  VerticalScrollList,
  VerticalScrollListItem,
  InteractiveTodoList,
} from './'

export const TodoListSelector = ({data, ...props}) => (
  <VerticalScrollList>
    {data.map(d => (
      <VerticalScrollListItem key={`todo__${d.id}`}>
        <InteractiveTodoList {...props} {...d} />
      </VerticalScrollListItem>
    ))}
  </VerticalScrollList>
)
