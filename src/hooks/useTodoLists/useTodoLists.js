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
    list => dispatch({type: 'DELETE_LIST', listId: list}),
    [],
  )

  const addTodo = useCallback(
    (list, label) => dispatch({type: 'NEW_TODO', listId: list, label}),
    [],
  )

  const completeTodo = useCallback(
    (list, todo, done = true) =>
      dispatch({type: 'COMPLETE_TODO', listId: list, todoId: todo, done}),
    [],
  )

  const updateTodo = useCallback(
    (list, todo, label) =>
      dispatch({type: 'UPDATE_TODO', listId: list, todoId: todo, label}),
    [],
  )

  const deleteTodo = useCallback(
    (list, todo) => dispatch({type: 'DELETE_TODO', listId: list, todoId: todo}),
    [],
  )

  const clearCompleted = useCallback(
    list => dispatch({type: 'CLEAR_COMPLETE', listId: list}),
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
