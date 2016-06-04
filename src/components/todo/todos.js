import React, { Component } from 'react';
import { observer } from "mobx-react";
import  TodoStore from '../../stores/todo_store';
import { storeGetAll, storePreviousPage, storeNextPage, storeEditForm } from '../../actions/base_actions';
import Todo from './todo';
import { dispatch } from '../../helpers/dispatcher';
import TodoForm from './todo_form';
import { registerStore } from '../../stores/register_store';

@observer  // need observer when we add, delete rows
class Todos extends Component {
  constructor() {
    super();
    this.store = TodoStore.mount();
    this.handleAdd = this.handleAdd.bind(this)
  }

  componentWillMount() {
    dispatch(storeGetAll(this.store));
  }

  componentWillUnmount() {
    TodoStore.unmount(this.store);
  }

  handleAdd() {
    var component = <TodoForm mstore={this.store} todo={TodoStore.createTodo()} />
    dispatch(storeEditForm(this.store, component, TodoStore.getEditFormDimension()))
  }

  render() {
    return ( 
      <div>
        <table className='table table-hoover' style={{ height: 400}}>
          <thead >
            <tr><th><i className="fa fa-edit" /></th><th>Description</th><th>Status</th><th><i className="fa fa-trash" /></th></tr>
          </thead>
          {/* note: always need a key */} 
          <tbody>
            { this.store.page.map( todo => 
              <Todo key={registerStore.nextId()} todo={todo} mstore={this.store} />
              )
            }
          </tbody>
        </table>
        <button onClick={ () => dispatch(storePreviousPage(this.store)) }>prev</button>
        <button onClick={ () => dispatch(storeNextPage(this.store)) }>next</button>
        <button onClick={ () => this.handleAdd() }>add</button>
      </div>
    )
  }
};
export default Todos;

