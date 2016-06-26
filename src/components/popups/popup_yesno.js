import React, { Component } from 'react'
import { popupClose } from '../../actions/popup_actions'
import { dispatch } from '../../helpers/dispatcher'
import { FormattedMessage } from 'react-intl'

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
            }}><FormattedMessage id="form.yes"/></button>

          <button onClick={ () => { 
            dispatch(popupClose())
            if (this.props.NoAction) {
              dispatch(this.props.NoAction())
            }
            } }><FormattedMessage id="form.no"/></button>
        </div>
      </div>          
    )
  }
}

