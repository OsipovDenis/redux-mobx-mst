import test from 'ava';
import TodoListModel from './TodoListModel'

test('Mobx', t => {
  const model = new TodoListModel();

  model.addTodo('new todo');
  t.is(model.todos[0].title, 'new todo')

  model.addTodo('once more todo');
  t.is(model.todos[1].title, 'once more todo');

  model.todos[1].setTitle('another name');
  t.is(model.todos[1].title, 'another name');

  t.false(model.todos[1].finished);
  model.todos[1].finished = true;
  t.true(model.todos[1].finished)

  t.is(model.todos.length, 2);
  model.removeTodo(model.todos[1]);
  t.is(model.todos.length, 1);
});
