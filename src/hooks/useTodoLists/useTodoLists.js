import {useReducer, useMemo, useCallback} from 'react'
import {todoListsReducer} from './reducer'

const useTodoLists = (initialTodoLists = []) => {
  const [todoLists, dispatch] = useReducer(todoListsReducer, initialTodoLists)

  const totalTodos = useMemo(
    () =>
      todoLists.reduce(
        (total, todoList) =>
          total + todoList.todos.filter(({done}) => !done).length,
        0,
      ),
    [todoLists],
  )

  const addTodoList = useCallback(
    title => dispatch({type: 'NEW_LIST', title}),
    [],
  )

  const deleteTodoList = useCallback(
    list => dispatch({type: 'DELETE_LIST', listIdx: list}),
    [],
  )

  const addTodo = useCallback(
    (list, title) => dispatch({type: 'NEW_TODO', listIdx: list, title}),
    [],
  )

  const completeTodo = useCallback(
    (list, todo, done = true) =>
      dispatch({type: 'COMPLETE_TODO', listIdx: list, todoIdx: todo, done}),
    [],
  )

  const updateTodo = useCallback(
    (list, todo, title) =>
      dispatch({type: 'UPDATE_TODO', listIdx: list, todoIdx: todo, title}),
    [],
  )

  const deleteTodo = useCallback(
    (list, todo) =>
      dispatch({type: 'DELETE_TODO', listIdx: list, todoIdx: todo}),
    [],
  )

  const clearCompleted = useCallback(
    list => dispatch({type: 'CLEAR_COMPLETE', listIdx: list}),
    [],
  )

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

export {useTodoLists}
