const addTodo = title => ({
  type: 'ADD_TODO',
  id: Math.random(),
  title
});

const removeTodo = id => ({
  type: 'REMOVE_TODO',
  id
});

const setTodoTitle = action => ({
  type: 'SET_TODO_TITLE',
  ...action
});

const setTodoFinished = action => ({
  type: 'SET_TODO_FINISHED',
  ...action
});

export const addTodoAction = title => dispatch => dispatch(addTodo(title));
export const removeTodoAction = id => dispatch => dispatch(removeTodo(id));
export const setTodoTitleAction = data => dispatch => dispatch(setTodoTitle(data));
export const setTodoFinishedAction = data => dispatch => dispatch(setTodoFinished(data));

