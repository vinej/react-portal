import React, { Component } from 'react';
import { observer } from "mobx-react";
import  TodoStore from '../stores/todo_store';
import { storeGetAll, storePreviousPage, storeNextPage } from '../actions/base_actions';
import Todo from './todo';
import { dispatch } from '../helpers/dispatcher';

@observer  // need observer when we add, delete rows
class Todos extends Component {
  constructor() {
    super();
    this.store = TodoStore.mount();
  }

  componentWillMount() {
    dispatch(storeGetAll(this.store));
  }

  componentWillUnmount() {
    TodoStore.unmount(this.store);
  }

  render() {
    return ( 
      <div>
        <table className='table table-hoover' style={{ height: 400}}>
          <thead >
            <tr><th>Description</th><th>Status</th><th>DEL</th></tr>
          </thead>
          {/* note: always need a key */} 
          <tbody>
            { this.store.page.map( todo => 
              <Todo key={todo._id} todo={todo} mstore={this.store} />
              )
            }
          </tbody>
        </table>
        <button onClick={ () => dispatch(storePreviousPage(this.store)) }>prev</button>
        <button onClick={ () => dispatch(storeNextPage(this.store)) }>next</button>
      </div>
    )
  }
};
export default Todos;

