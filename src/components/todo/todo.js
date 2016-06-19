import React, { Component } from 'react';
import { observer } from "mobx-react";
import { pageDeleteRecord } from '../../actions/page_actions';
import { popupShow } from '../../actions/popup_actions';
import { dispatch } from '../../helpers/dispatcher';
import TodoView from './todo_view';
import TodoStore from '../../stores/todo_store';
import TodoModel from '../../models/todo_model'
import { todoForm } from '../../forms/todo_form'

@observer // need observer to update a row when a note is modified
class Todo extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  static propTypes = {
    store:  React.PropTypes.instanceOf(TodoStore),  
    todo:  React.PropTypes.shape(TodoModel.shape())  
  }


  handleDelete(todo) {
    dispatch(pageDeleteRecord(this.props.store, todo));
  }     

  handleEdit(todo) {
    var component = <TodoView store={this.props.store} form={todoForm} todo={todo} />
    dispatch(popupShow(component, TodoStore.getEditFormDimension()));
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