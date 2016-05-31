import React, { Component } from 'react';
import { observer } from "mobx-react";;
import { Link } from 'react-router';
import { popupStore } from '../stores/popup_store';

@observer
class Popup extends Component {
  render() {
    return (
      <div className="popup" id={`popup${this.props._id}`} style={ { 
        visibility : this.props.store.visibility, 
        height : this.props.store.height, 
        width : this.props.store.width,
        left : this.props.store.left,
        top : this.props.store.top } } />
    )
  }
}
export default Popup;
