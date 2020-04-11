import shortid from 'shortid'
import {findTodoListIdx, findTodoIdx, removeItemFromArray} from './utils'

export const todoListsReducer = (
  todoLists,
  {type, title, label, listId, todoId, done},
) => {
  const todoListsCopy = [...todoLists]
  const listIdx = findTodoListIdx(listId, todoListsCopy)
  const todoIdx = findTodoIdx(todoId, listIdx, todoLists)

  switch (type) {
    case 'NEW_LIST':
      return [...todoLists, {title, todos: [], id: shortid.generate()}]

    case 'DELETE_LIST':
      return todoListsCopy.filter(({id}) => id !== listId)

    case 'RENAME_LIST':
      todoListsCopy[listIdx].title = title
      return todoListsCopy

    case 'CLEAR_COMPLETE':
      todoListsCopy[listIdx].todos = todoListsCopy[listIdx].todos.filter(
        ({done}) => !done,
      )

      return todoListsCopy

    case 'NEW_TODO':
      todoListsCopy[listIdx].todos = [
        ...todoListsCopy[listIdx].todos,
        {label, content: '', id: shortid.generate()},
      ]
      return todoListsCopy

    case 'COMPLETE_TODO':
      todoListsCopy[listIdx].todos[todoIdx] = {
        ...todoListsCopy[listIdx].todos[todoIdx],
        done,
      }
      return todoListsCopy

    case 'UPDATE_TODO':
      todoListsCopy[listIdx].todos[todoIdx] = {
        ...todoListsCopy[listIdx].todos[todoIdx],
        label,
      }
      return todoListsCopy

    case 'DELETE_TODO':
      if (
        todoListsCopy[listIdx].todos[todoIdx].done ||
        window.confirm('Are you sure?')
      ) {
        removeItemFromArray(todoListsCopy[listIdx].todos, todoIdx)
      }
      return todoListsCopy

    default:
      return todoLists
  }
}
