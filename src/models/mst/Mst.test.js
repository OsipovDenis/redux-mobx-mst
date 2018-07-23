import test from 'ava';
import { types } from 'mobx-state-tree';
import TodoListModel from './TodoListModel';

test('Mst', t => {
  const model = TodoListModel.create();

    model.addTodo('new todo');
    t.is(model.todos[0].title, 'new todo')

    model.addTodo('once more todo');
    t.is(model.todos[1].title, 'once more todo');

    model.todos[1].setTitle('another name');
    t.is(model.todos[1].title, 'another name');

    t.false(model.todos[1].finished);
    // Не получится изменить как в mobx
    // model.todos[1].finished = true;
    model.todos[1].setFinished(true);
    t.true(model.todos[1].finished)

    t.is(model.todos.length, 2);
    model.removeTodo(model.todos[1]);
    t.is(model.todos.length, 1);
});

test('Mst composition example', t => {
  const TodoListModelExapanded = types.model('TodoListModelExapanded', {
    title: types.optional(types.string, 'default')
  }).actions(self => ({
    setTitle(title) {
      self.title = title;
    }
  }))

  // Объеденяем модели
  const composedModel = types.compose(TodoListModel, TodoListModelExapanded);
  const model = composedModel.create();

  t.is(model.title, 'default');
  model.setTitle('title');
  t.is(model.title, 'title');

  model.addTodo('once more todo');
  t.is(model.todos[0].title, 'once more todo');

  t.false(model.todos[0].finished);
  model.todos[0].setFinished(true);
  t.true(model.todos[0].finished)

  t.is(model.todos.length, 1);


  // Берём composedModel за основную и дополняем свойством foo
  // На выходе получается сомостоятельная модель
  const compositionModel = composedModel
                              .named('AnotherComposition')
                              .props({
                                foo: types.optional(types.string, 'bar')
                              });

  const model1 = compositionModel.create();

  t.is(model1.foo, 'bar');
  t.is(model1.title, 'default');
})

