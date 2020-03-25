import React from 'react'
import {
  HorizontalScrollList,
  HorizontalScrollListItem,
  InteractiveTodoList,
} from './'

export const TodoListSelector = ({data, ...props}) => (
  <HorizontalScrollList>
    {data.map(d => (
      <HorizontalScrollListItem key={`todo__${d.id}`}>
        <InteractiveTodoList {...props} {...d} />
      </HorizontalScrollListItem>
    ))}
  </HorizontalScrollList>
)
