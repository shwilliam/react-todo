import shortid from 'shortid'

export const welcomeTodos = [
  {
    id: shortid.generate(),
    title: 'Welcome 👋',
    todos: [
      {
        id: shortid.generate(),
        label: 'Add a new todo list',
        done: true,
      },
      {
        id: shortid.generate(),
        label: 'Add a task',
        done: true,
      },
      {
        id: shortid.generate(),
        label: 'Double-click a task to edit it',
        done: false,
      },
      {
        id: shortid.generate(),
        label: 'Tap or slide a task right to mark as done',
        done: false,
      },
      {
        id: shortid.generate(),
        label: 'Slide it left to delete it',
        done: false,
      },
      {
        id: shortid.generate(),
        label: 'Slide the list up or down to dismiss it',
        done: false,
      },
    ],
  },
]
