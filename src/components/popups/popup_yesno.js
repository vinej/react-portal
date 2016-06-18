import React, { Component } from 'react'
import { popupClose } from '../../actions/popup_actions'
import { dispatch } from '../../helpers/dispatcher'

class PopupYesNo extends Component {
  render() {
    return (
      <div>
        <div className='popupHeader'>{ this.props.title }</div>
        <div className='popupMsg'>{ this.props.msg }</div>
        <button className="btn btn-danger" onClick={ () => {
            dispatch(this.props.yesAction()) 
            dispatch(popupClose())
          }}>Yes</button>

        <button className="btn" onClick={ () => { 
            dispatch(popupClose())
            if (this.props.NoAction) {
              dispatch(this.props.NoAction())
            }
          } }>No</button>
      </div>          
    )
  }
}
export default PopupYesNo;
