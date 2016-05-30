import React, { Component } from 'react';
import { observer } from "mobx-react";
import { storeDelete, storeEditForm } from '../../actions/base_actions';
import { dispatch } from '../../helpers/dispatcher';
import TodoForm from './todo_form';
import TodoStore from '../../stores/todo_store';

@observer // need observer to update a row when a note is modified
class Todo extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(todo) {
    dispatch(storeDelete(this.props.mstore, todo));
  }     

  handleEdit(todo) {
    var component = <TodoForm mstore={this.props.mstore} todo={todo} />
    dispatch(storeEditForm(this.props.mstore, component, TodoStore.getEditFormDimension()));
  }     

  render() {
    const todo = this.props.todo;
    return (
      <tr>
        <td><i onClick={ () => this.handleEdit(todo)} className="fa fa-edit"/></td>
        <td>{todo.description}</td>
        <td>{todo.status}</td>
        <td><i onClick={ () => this.handleDelete(todo)} className="fa fa-trash"/></td>
      </tr>
    );
  }
};
export default Todo;