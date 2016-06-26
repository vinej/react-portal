import React, { Component } from 'react';
import { observer } from "mobx-react";
import  UserStore from '../../stores/user_store';
import { pageGetAll, pagePrevious, pageNext } from '../../actions/page_actions';
import User from './user';
import { dispatch } from '../../helpers/dispatcher';
import { FormattedMessage } from 'react-intl'

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
    }
  }

  render() {
    const store = this.props.store
    return ( 
      <div style={{ height: '400px'}}>
        <table className='pure-table' style={{ height: 400}}>
          <thead >
            <tr><th><FormattedMessage id='user.name'/></th>
            <th><FormattedMessage id='user.desc'/></th>
            <th><FormattedMessage id='form.id'/></th>
            <th><FormattedMessage id='form.del'/></th></tr>
          </thead>
          {/* note: always need a key */} 
          <tbody>
            { store.page.map( user => 
              <User key={user._id} user={user} store={store} />
              )
            }
          </tbody>
        </table>
        <button onClick={ () => dispatch(pagePrevious(store)) }><FormattedMessage id='form.prev'/></button>
        <button onClick={ () => dispatch(pageNext(store)) }><FormattedMessage id='form.next'/></button>
      </div>
    )
  }
}


