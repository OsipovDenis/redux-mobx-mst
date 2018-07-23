import { createSelector } from 'reselect'

// https://github.com/reduxjs/reselect#motivation-for-memoized-selectors
// Основной поинт использования селекторов в том чтобы оптимизировать дорогостоящие рассчеты. (см. пример выше)
// Если на вход подаётся селектор, который не меняется, то значение не меняется.
// Данный селектор отрабатывает, когда в дереве меняется конкретно todos, а не что-то другое.
const todosSelector = state => state.todos;

export const unfinishedTodoCountSelector = createSelector(
  todosSelector,
  todos => todos.filter(todo => !todo.finished).length
);