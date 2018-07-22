import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import Todo from "./Todo";

@inject('store')
@observer
class TodoList extends React.Component {
  @observable newTodoTitle = "";

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

  // Как по мне это антипаттерн, не стоит мешать бизнес-логику с вьюхами
  @action
  handleInputChange = e => {
    this.newTodoTitle = e.target.value;
  };

  @action // Оборачивает действие от начала и до конца
  handleFormSubmit = e => {
    this.props.store.addTodo(this.newTodoTitle);
    this.newTodoTitle = "";
    e.preventDefault();
  };
}

export default TodoList;