import { createSelector } from 'reselect'

const todosSelector = state => state.todos;

export const unfinishedTodoCountSelector = createSelector(
  todosSelector,
  todos => todos.filter(todo => !todo.finished).length
);