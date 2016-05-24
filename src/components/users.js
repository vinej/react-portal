import React, { Component } from 'react';
import { observer } from "mobx-react";
import  UserStore from '../stores/user_store';
import * as actions from '../actions/base_actions';
import { connect } from 'react-redux';
import User from './user';

@observer  // need observer when we add, delete rows
class Users extends Component {
  constructor() {
    super();
    this.store = UserStore.mount();
  }

  componentWillMount() {
    this.props.storeGetAll(this.store);
  }

  componentWillUnmount() {
    UserStore.unmount(this.store);
    this.store = null;
  }

  render() {
    return ( 
      <div>
        <table className='table table-hoover' style={{ height: 400}}>
          <thead >
            <tr><th>Name</th><th>Desc</th><th>Id</th><th>DEL</th></tr>
          </thead>
          {/* note: always need a key */} 
          <tbody>
            { this.store.page.map( user => 
              <User key={user._id} user={user} mstore={this.store} />
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
export default connect(null, actions)(Users);

