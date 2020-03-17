const todoListsReducer = (todoLists, {type, title, idx}) => {
  switch (type) {
    case 'NEW_LIST':
      return [...todoLists, {title, todos: []}]

    case 'NEW_TODO':
      const todoListsCopy = [...todoLists]
      todoListsCopy[idx].todos = [
        ...todoListsCopy[idx].todos,
        {title, content: ''},
      ]
      return todoListsCopy

    default:
      return todoLists
  }
}

export {todoListsReducer}
