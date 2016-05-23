import React, { Component } from 'react';
import { observer } from "mobx-react";
import  TodoStore from '../stores/todo_store';
import * as actions from '../actions/base_actions';
import { connect } from 'react-redux';
import Todo from './todo';

@observer  // need observer when we add, delete rows
class Todos extends Component {

  constructor() {
    super();
    this.store = TodoStore.create();
  }

  componentWillMount() {
    this.props.storeGetAll(this.store);
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
        <button onClick={ () => this.props.storePreviousPage(this.store) }>prev</button>
        <button onClick={ () => this.props.storeNextPage(this.store) }>next</button>
      </div>
    )
  }
};
export default connect(null, actions)(Todos);

