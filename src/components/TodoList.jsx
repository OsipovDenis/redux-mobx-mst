import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react"; // Расширенный пакет PropTypes - https://github.com/mobxjs/mobx-react#proptypes

import TodoModel from "../models/mobx/TodoModel";

import Todo from "./Todo";

// Берёт из React.Context наш store и прокидывает его пропсами в компонент.
@inject('store')
// observer очень интересный декоратор, он превращает наш компонент в реактивный компонент, запуская autorun на каждое изменение observable.
// observer подписывается на структуры данных, которые использовались в момент последнего рендера (не все observable).
// observer нужно использовать всегда, когда используются observable данные.
// Добавляется новая хука componentWillReact, в тот момент когда изменяются observable данные в компоненте.
// componentWillReceiveProps не работает. Добавляется хука componentWillReact.
@observer
class TodoList extends React.Component {

  // https://medium.com/react-native-training/ditching-setstate-for-mobx-766c165e4578
  @observable newTodoTitle = "";

  // componentWillReact() {
  //   console.log('componentWillReact');
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input
            type="text"
            value={this.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <hr />
        <ul>
          {Boolean(this.props.store.todos.length) && this.props.store.todos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.store.unfinishedTodoCount}
      </div>
    );
  }

  @action
  handleInputChange = e => {
    this.newTodoTitle = e.target.value;
  };

  // @action
  handleFormSubmit = e => {
    e.preventDefault();

    // Можно прямо тут развернуть
    // this.props.store.todos.push(new TodoModel(this.newTodoTitle));

    this.props.store.addTodo(this.newTodoTitle);
    this.newTodoTitle = "";
  };
}

export default TodoList;
