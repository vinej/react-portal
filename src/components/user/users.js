import React, { Component } from 'react';
import { observer } from "mobx-react";
import  UserStore from '../../stores/user_store';
import { pageGetAll, pagePrevious, pageNext } from '../../actions/page_actions';
import User from './user';
import { dispatch } from '../../helpers/dispatcher';


@observer  // need observer when we add, delete rows
class Users extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    if (this.props.store) {
      this.store = this.props.store;
      this.storeAsProps = true
    } else {
      this.store = UserStore.create();
      this.storeAsProps = false
    }      
    dispatch(pageGetAll(this.store));
  }

  componentWillUnmount() {
    if (this.storeAsProps == false)  {
      UserStore.remove(this.store);
      this.store = null;
    }
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
        <button onClick={ () => dispatch(pagePrevious(this.store)) }>prev</button>
        <button onClick={ () => dispatch(pageNext(this.store)) }>next</button>
      </div>
    )
  }
};
export default Users;

