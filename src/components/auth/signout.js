import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth_actions';

class Signout extends Component {
  componentWillMount() {
    this.props.authSignOut();
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}

export default connect(null, actions)(Signout);
