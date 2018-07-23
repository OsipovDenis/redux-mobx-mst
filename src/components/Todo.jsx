import React, { Component } from "react";
import { observable } from 'mobx';
import { observer, inject } from "mobx-react"; // Расширенный пакет PropTypes - https://github.com/mobxjs/mobx-react#proptypes

// Берёт из React.Context наш store и прокидывает его пропсами в компонент.
@inject('store')
// observer очень интересный декоратор - это реакт компонент, который патчит наш компонент предмет перерендера.
// observer нужно использовать всегда, когда используются observable данные.
// Добавляется новая хука componentWillReact, в тот момент когда изменяются observable данные в компоненте.
// componentWillReceiveProps не работает.
@observer
export default class Todo extends Component {
  @observable mode = 'done'

  get store() {
    return this.props.store;
  }

  get todo() {
    return this.props.todo;
  }

  render() {
    return (
      <li>
        <input
          type="checkbox"
          checked={this.todo.finished}
          onClick={this.handleFinished}
        />
        {this.mode === 'edit' ? <input value={this.todo.title} onChange={this.handleChange} /> : this.todo.title}
        <button type="button" onClick={this.handleEdit}>{this.mode === 'edit' ? 'Done' : 'Edit'}</button>
        <button type="button" onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }

  handleFinished = () => {
    if (this.todo.setFinished) { // Кейс mst, нельзя менять модель снаружи
      this.todo.setFinished(!this.todo.finished)
    } else {  // Кейс mobx (прим. Антипаттерн, мешаем бизнес-логику моделей и вьюхи)
      this.todo.finished = !this.todo.finished;
    }
  }

  handleEdit = ({target: value}) => {
      if (this.mode === 'edit') {
        this.mode = 'done';
      } else {
        this.mode = 'edit';
      }
  }

  handleDelete = () => {
    this.props.store.removeTodo(this.todo);
  }

  handleChange = ({ target: { value } }) => {
    this.todo.setTitle(value);
  }
}

