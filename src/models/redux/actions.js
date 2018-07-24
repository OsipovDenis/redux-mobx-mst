export const addTodoAction = title => ({
  type: 'ADD_TODO',
  id: Math.random(),
  title
});

export const removeTodoAction = id => ({
  type: 'REMOVE_TODO',
  id
});

export const setTodoTitleAction = data => ({
  type: 'SET_TODO_TITLE',
  ...data
});

export const setTodoFinishedAction = data => ({
  type: 'SET_TODO_FINISHED',
  ...data
});

