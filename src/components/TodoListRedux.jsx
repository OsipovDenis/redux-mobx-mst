import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTodoAction } from '../models/redux/actions';
import { unfinishedTodoCountSelector } from '../models/redux/selectors';

import TodoRedux from "./TodoRedux";

const mapStateToProps = store => ({
  store,
  unfinishedTodoCount: unfinishedTodoCountSelector(store)
});

const mapDispatchToProps = dispatch => ({
  addTodoAction: bindActionCreators(addTodoAction, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoListRedux extends React.Component {
  state = {
    newTodoTitle: ""
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input
            type="text"
            value={this.state.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <hr />
        <ul>
          {Boolean(this.props.store.todos.length) && this.props.store.todos.map((todo, index) =>
            <TodoRedux key={todo.id} todo={todo} />
          )}
        </ul>
        Tasks left: {this.props.unfinishedTodoCount}
      </div>
    );
  }

  handleInputChange = e => {
    this.setState({ newTodoTitle: e.target.value })
  };

  handleFormSubmit = e => {
    this.props.addTodoAction(this.state.newTodoTitle);
    this.setState({ newTodoTitle: '' })
    e.preventDefault();
  };
}
