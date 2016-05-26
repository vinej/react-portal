import React, { Component } from 'react';
import { authSignOut } from '../../actions/auth_actions';
import { dispatch } from '../../helpers/dispatcher';

class Signout extends Component {
  componentWillMount() {
    dispatch(authSignOut());
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}
export default Signout;
