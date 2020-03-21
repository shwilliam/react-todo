import shortid from 'shortid'

const todoListsReducer = (todoLists, {type, title, listId, todoId, done}) => {
  const todoListsCopy = [...todoLists]

  const listIdx =
    typeof listId !== 'undefined' &&
    todoListsCopy.findIndex(({id}) => listId === id)

  const todoIdx =
    typeof todoId !== 'undefined' &&
    todoListsCopy[listIdx].todos.findIndex(({id}) => todoId === id)

  switch (type) {
    case 'NEW_LIST':
      return [...todoLists, {title, todos: [], id: shortid.generate()}]

    case 'DELETE_LIST':
      return todoListsCopy.filter(({id}) => id !== listId)

    case 'CLEAR_COMPLETE':
      todoListsCopy[listIdx].todos = todoListsCopy[listIdx].todos.filter(
        ({done}) => !done,
      )

      return todoListsCopy

    case 'NEW_TODO':
      todoListsCopy[listIdx].todos = [
        ...todoListsCopy[listIdx].todos,
        {title, content: '', id: shortid.generate()},
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
        title,
      }
      return todoListsCopy

    case 'DELETE_TODO':
      if (
        todoListsCopy[listIdx].todos[todoIdx].done ||
        window.confirm('Are you sure?')
      ) {
        todoListsCopy[listIdx].todos.splice(todoIdx, 1)
      }
      return todoListsCopy

    default:
      return todoLists
  }
}

export {todoListsReducer}
