const todoListsReducer = (todoLists, {type, title, listIdx, todoIdx, done}) => {
  const todoListsCopy = [...todoLists]

  switch (type) {
    case 'NEW_LIST':
      return [...todoLists, {title, todos: []}]

    case 'DELETE_LIST':
      todoListsCopy.splice(listIdx, 1)
      return todoListsCopy

    case 'CLEAR_COMPLETE':
      todoListsCopy[listIdx].todos = todoListsCopy[listIdx].todos.filter(
        ({done}) => !done,
      )

      return todoListsCopy

    case 'NEW_TODO':
      todoListsCopy[listIdx].todos = [
        ...todoListsCopy[listIdx].todos,
        {title, content: ''},
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
