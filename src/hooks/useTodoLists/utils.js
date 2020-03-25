export const removeItemFromArray = (list, idx) => {
  list.splice(idx, 1)
  return list
}

export const calculateRemainingTodos = todoLists =>
  todoLists.reduce(
    (total, todoList) =>
      total + todoList.todos.filter(({done}) => !done).length,
    0,
  )

export const findTodoListIdx = (listId, todoLists) =>
  typeof listId !== 'undefined' && todoLists.findIndex(({id}) => listId === id)

export const findTodoIdx = (todoId, listIdx, todoLists) =>
  typeof todoId !== 'undefined' &&
  todoLists[listIdx].todos.findIndex(({id}) => todoId === id)
