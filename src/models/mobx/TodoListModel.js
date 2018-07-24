import {
  observable,
  computed,
  action,
  when,
  decorate
} from "mobx";

import TodoModel from "./TodoModel";

export default class TodoListModel {
  // observable могут быть любые значение, не только примитивы, но и объекты, массивы, ссылки.
  @observable todos = [];

  constructor(/* options */) {
    // this.todos = options.todos;

    // Один из примеров реакции (autorun, reaction or when).
    // Последняя функция вызовется в том случае когда выполнится условие первой (можем создавать подписки на разные события).
    when(
      () => this.todos.length && this.todos[1] && this.todos[1].finished,
      () => { console.log('second is ready'); }
    );
  }

  // action должен приводить к изменению состояния. Как мы это будем делать не важно.
  // Можно делать из обработчика в компоненте, можно передавать в модель.
  // Несколько "плюсов" экшенов:
  // 1) Маркируют действия, которые изменяют состояния
  // 2) Возвращают функцию с той же сигнатурой обернутую в транзакцию.
  //    Что это значит? Это говорит нам о том, что промежуточные значения внутри функции не применятся к модели.
  //    Простыми словами, прирост производительности.
  @action
  addTodo(title) {
    if (this.todos.length){
      const title = this.todos.length && this.todos[0].title;
      this.todos[0].title = 'Новое имя переменной';
      this.todos[0].title = title;
    }

    this.todos.push(new TodoModel(title));
  }

  @action
  removeTodo(todo) {
    // Сложные типы данных не путать с обычными js. Mobx arrays имеют расширенный функционал.
    // https://mobx.js.org/refguide/array.html
    // Но есть один минус:)
    // Array.isArray(this.todos) вернёт false.
    // Чтобы проверка прошла, нужно преобразовать к обычному массиву Array.isArray(this.todos.slice()) тогда будети true.
    // И это нужно делать всегда при работе со другими библиотеками или встроенными функциями :/
    this.todos.remove(todo);
  }

  // computed значения похожи на ячейки в excel.
  // computed данные автоматически получаются из состояния, если какое-либо значение, влияющее на них, изменяется.
  // computed данные кэшируются и всегда актуальные.
  // Рекомендуется их всегда испольховать при расчетах.
  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  // Прим. асинхронного запроса
  // async fetchData() {
  //   const result = await fetch('/getTodos');
  //   this.setTodos(result.todos);
  // }
  //
  // @action
  // setTodos(todos) {
  //   this.todos = todos;
  // }
}

// В функциональном стиле
// decorate(TodoListModel, {
//     todos: observable,
//     addTodo: action,
//     removeTodo: action,
// })

