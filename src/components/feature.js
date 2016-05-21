import React, { Component } from 'react';
import { observer } from "mobx-react";
import { connect } from 'react-redux';
import * as actions from '../actions/message_actions';
import { messageStore } from '../stores/message_store';

@observer
class Feature extends Component {
  componentWillMount() {
    this.props.messageFetch();
  }

  render() {
    return (
      <div className='feature'>{messageStore.message}</div>
    );
  }
}
export default connect(null, actions)(Feature);
