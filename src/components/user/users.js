import React, { Component } from 'react';
import { observer } from "mobx-react";
import  UserStore from '../../stores/user_store';
import { pageGetAll, pagePrevious, pageNext } from '../../actions/page_actions';
import User from './user';
import { dispatch } from '../../helpers/dispatcher';

@observer  // need observer when we add, delete rows
export default class Users extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    store:          React.PropTypes.instanceOf(UserStore),
    isRemoveStore : React.PropTypes.bool      // true means that the store must be delete here
                                              // false means that the store will be deleted by the parent
  }

  componentWillMount() {
    dispatch(pageGetAll(this.props.store));
  }

  componentWillUnmount() {
    if (this.props.isRemoveStore === true) {
      UserStore.remove(this.props.store)
      this.props.store = null;
    }
  }

  render() {
    const store = this.props.store
    return ( 
      <div style={{ height: '400px'}}>
        <table className='table table-hoover' style={{ height: 400}}>
          <thead >
            <tr><th>Name</th><th>Desc</th><th>Id</th><th>DEL</th></tr>
          </thead>
          {/* note: always need a key */} 
          <tbody>
            { store.page.map( user => 
              <User key={user._id} user={user} store={store} />
              )
            }
          </tbody>
        </table>
        <button onClick={ () => dispatch(pagePrevious(store)) }>prev</button>
        <button onClick={ () => dispatch(pageNext(store)) }>next</button>
      </div>
    )
  }
}


