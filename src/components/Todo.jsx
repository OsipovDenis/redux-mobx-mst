import React, { Component } from "react";
import { observable } from 'mobx';
import { observer, inject } from "mobx-react";

@inject('store')
@observer
export default class Todo extends Component {
  @observable mode = 'edit'

  get store() {
    return this.props.store;
  }

  render() {
    const { todo } = this.props;
    return (
      <li>
        <input
          type="checkbox"
          checked={todo.finished}
          onClick={() => (todo.finished = !todo.finished)}
        />
        {this.mode === 'done' ? <input value={todo.title} onChange={this.handleChange} /> : todo.title}
        <button type="button" onClick={this.handleEdit}>{this.mode === 'edit' ? 'Edit' : 'Done'}</button>
        <button type="button" onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }

  handleEdit = ({target: value}) => {
      if (this.mode === 'edit') {
        this.mode = 'done';
      } else {
        this.mode = 'edit';
      }
  }

  handleDelete = () => {
    this.props.store.removeTodo(this.props.todo);
  }

  handleChange = ({ target: { value } }) => {
    this.props.todo.setTitle(value);
  }
}

