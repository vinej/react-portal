import React, { Component } from 'react';
import { authSignOut } from '../../actions/auth_actions';
import { dispatch } from '../../helpers/dispatcher';
import { FormattedMessage } from 'react-intl'

class Signout extends Component {
  componentWillMount() {
    dispatch(authSignOut());
  }

  render() {
    return <div><FormattedMessage id="app.sorry"/></div>;
  }
}
export default Signout;
