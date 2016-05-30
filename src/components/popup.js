import React, { Component } from 'react';
import { observer } from "mobx-react";;
import { Link } from 'react-router';
import { popupStore } from '../stores/popup_store';

@observer
class Popup extends Component {
  render() {
    return (
      <div id='popup' className='popup' style={ { 
        visibility : popupStore.visibility, 
        height : popupStore.height, 
        width : popupStore.width,
        left : popupStore.left,
        top : popupStore.top } } />
    )
  }
}
export default Popup;
