import test from 'ava';
import store from './store';
import * as actions from './actions';

test('Redux', t => {

  store.dispatch(actions.addTodoAction('new todo'));
  t.is(store.getState().todos.length, 1);
  t.is(store.getState().todos[0].title, 'new todo')

  store.dispatch(actions.addTodoAction('once more todo'));
  t.is(store.getState().todos[1].title, 'once more todo');

  store.dispatch(
    actions.setTodoTitleAction({
      id: store.getState().todos[1].id,
      title: 'once more todo'
    })
  );
  t.is(store.getState().todos[1].title, 'once more todo');

  store.dispatch(
    actions.setTodoFinishedAction({
      id: store.getState().todos[1].id,
      finished: true
    })
  );
  t.true(store.getState().todos[1].finished)

  t.is(store.getState().todos.length, 2);
  store.dispatch(actions.removeTodoAction(store.getState().todos[1].id));
  t.is(store.getState().todos.length, 1);

})