import React, { Component } from 'react'
import { popupClose } from '../../actions/popup_actions'
import { dispatch } from '../../helpers/dispatcher'

export default class PopupYesNo extends Component {
  render() {
    return (
      <div className='rp-form-small'>
        <div className='rp-popup-header'>{ this.props.title }</div>
        <div className='rp-popup-msg'>{ this.props.msg }</div>
        <div className='rp-form-button'>
          <button onClick={ () => {
            dispatch(this.props.yesAction()) 
            dispatch(popupClose())
            }}>Yes</button>

          <button onClick={ () => { 
            dispatch(popupClose())
            if (this.props.NoAction) {
              dispatch(this.props.NoAction())
            }
            } }>No</button>
        </div>
      </div>          
    )
  }
}

