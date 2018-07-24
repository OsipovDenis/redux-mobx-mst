import { types, getParent } from 'mobx-state-tree';
import TodoListModel from './TodoListModel';

const TodoModel = types.model('TodoModel', {
  id: types.identifier,
  title: '', // types.optional(types.string, '')
  finished: false // types.optional(types.bool, false)
}).actions(self => ({
  setTitle(title) {
    self.title = title;
  },
  setFinished(finished) {
    self.finished = finished;
  }
}));

export default TodoModel;
