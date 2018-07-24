import { types } from 'mobx-state-tree';
import TodoModel from './TodoModel';

const TodoListModel = types.model('TodoListModel', {
  id: types.identifier, // аналог key в react
  todos: types.optional(types.array(TodoModel), [])
}).preProcessSnapshot((model = {}) => { // Обязательно чистая функция, не надо менять входной аргумент.
  const self = { ...model };
  if (!self.id) {
    self.id = Math.random().toString();
  }
  return self;
}).actions(self => ({
  afterCreate() { // Подробнее про хуки https://github.com/mobxjs/mobx-state-tree#lifecycle-hooks-for-typesmodel
    console.log('TodoListModel created');
  },
  addTodo(title) {
    self.todos.push(TodoModel.create({ id: Math.random().toString(), title })); //
  },
  removeTodo(todo) {
    self.todos.remove(todo);
  }
})).views(self => ({
  get unfinishedTodoCount() {
    return self.todos.filter(todo => !todo.finished).length;
  }
}));

export default TodoListModel;
