import {useReducer, useMemo, useCallback} from 'react'
import {todoListsReducer} from './reducer'

const useTodoLists = (initialTodoLists = []) => {
  const [todoLists, dispatch] = useReducer(todoListsReducer, initialTodoLists)

  const totalTodos = useMemo(
    () =>
      todoLists.reduce((total, todoList) => total + todoList.todos.length, 0),
    [todoLists],
  )

  const addTodoList = useCallback(
    title => dispatch({type: 'NEW_LIST', title}),
    [],
  )
  const addTodo = useCallback(
    (idx, title) => dispatch({type: 'NEW_TODO', idx, title}),
    [],
  )

  return {todoLists, totalTodos, addTodoList, addTodo}
}

export {useTodoLists}
