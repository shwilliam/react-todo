import {useReducer, useMemo, useCallback} from 'react'
import {todoListsReducer} from './reducer'
import {welcomeTodos} from './welcome-todos'
import {calculateRemainingTodos} from './utils'

export const useTodoLists = (initialTodoLists = welcomeTodos) => {
  const [todoLists, dispatch] = useReducer(todoListsReducer, initialTodoLists)

  const addTodoList = useCallback(
    title => dispatch({type: 'NEW_LIST', title}),
    [],
  )

  const deleteTodoList = useCallback(
    listId => dispatch({type: 'DELETE_LIST', listId}),
    [],
  )

  const addTodo = useCallback(
    (listId, label) => dispatch({type: 'NEW_TODO', listId, label}),
    [],
  )

  const completeTodo = useCallback(
    (listId, todoId, done = true) =>
      dispatch({type: 'COMPLETE_TODO', listId, todoId, done}),
    [],
  )

  const updateTodo = useCallback(
    (listId, todoId, label) =>
      dispatch({type: 'UPDATE_TODO', listId, todoId, label}),
    [],
  )

  const deleteTodo = useCallback(
    (listId, todoId) => dispatch({type: 'DELETE_TODO', listId, todoId}),
    [],
  )

  const clearCompleted = useCallback(
    listId => dispatch({type: 'CLEAR_COMPLETE', listId}),
    [],
  )

  const totalTodos = useMemo(() => calculateRemainingTodos(todoLists), [
    todoLists,
  ])

  return {
    todoLists,
    totalTodos,
    addTodoList,
    deleteTodoList,
    addTodo,
    completeTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
  }
}
