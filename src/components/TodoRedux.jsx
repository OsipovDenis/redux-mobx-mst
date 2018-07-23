import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeTodoAction, setTodoTitleAction, setTodoFinishedAction } from '../models/redux/actions';

const mapStateToProps = (store, props) => ({
  todo: store.todos[props.index]
});

const mapDispatchToProps = dispatch => ({
  removeTodoAction: bindActionCreators(removeTodoAction, dispatch),
  setTodoTitleAction: bindActionCreators(setTodoTitleAction, dispatch),
  setTodoFinishedAction: bindActionCreators(setTodoFinishedAction, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoRedux extends Component {
  state = {
    mode: 'done'
  }

  render() {
    return (
      <li>
        <input
          type="checkbox"
          checked={this.props.todo.finished}
          onClick={this.handleFinished}
        />
        {this.state.mode === 'edit' ? <input value={this.props.todo.title} onChange={this.handleChange} /> : this.props.todo.title}
        <button type="button" onClick={this.handleEdit}>{this.state.mode === 'edit' ? 'Done' : 'Edit'}</button>
        <button type="button" onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }

  handleFinished = () => {
    this.props.setTodoFinishedAction({
      id: this.props.todo.id,
      finished: !this.props.todo.finished
    });
  }

  handleEdit = () => {
      if (this.state.mode === 'edit') {
        this.setState({ mode: 'done'});
      } else {
        this.setState({ mode: 'edit'});
      }
  }

  handleDelete = () => {
    this.props.removeTodoAction(this.props.todo.id);
  }

  handleChange = ({ target: { value } }) => {
    this.props.setTodoTitleAction({
      id: this.props.todo.id,
      title: value
    });
  }
}
