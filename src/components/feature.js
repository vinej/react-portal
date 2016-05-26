import React, { Component } from 'react';
import { observer } from "mobx-react";
import { messageFetch } from '../actions/message_actions';
import { messageStore } from '../stores/message_store';
import { dispatch } from '../helpers/dispatcher';

@observer
class Feature extends Component {
  componentWillMount() {
    dispatch(messageFetch());
  }

  render() {
    return (
      <div className='feature'>{messageStore.message}</div>
    );
  }
}
export default Feature;
