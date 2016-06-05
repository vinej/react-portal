import React, { Component } from 'react';
import { observer } from "mobx-react";
import  UserStore from '../../stores/user_store';
import { baseGetAll, basePreviousPage, baseNextPage } from '../../actions/base_actions';
import User from './user';
import { dispatch } from '../../helpers/dispatcher';


@observer  // need observer when we add, delete rows
class Users extends Component {
  constructor() {
    super();
    this.store = UserStore.mount();
  }

  componentWillMount() {
    dispatch(baseGetAll(this.store));
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
        <button onClick={ () => dispatch(basePreviousPage(this.store)) }>prev</button>
        <button onClick={ () => dispatch(baseNextPage(this.store)) }>next</button>
      </div>
    )
  }
};
export default Users;

