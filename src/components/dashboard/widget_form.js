import React, { Component } from 'react'
import { popupClose } from '../../actions/popup_actions'
import { dashboardAddWidget } from '../../actions/dashboard_actions'
import { dispatch } from '../../helpers/dispatcher'
import WidgetStore from '../../stores/widget_store'

class WidgetForm extends Component {

  handleClick(name) {
    dispatch(dashboardAddWidget(name))
  }

  static propTypes = {
    store:  React.PropTypes.instanceOf(WidgetStore)  
  }

  render() {
    return (
      <div className='rp-form-small'>
        <div className="rp-popup-header">Add widget to current dashboard</div>
        { this.props.store.getWidgets().map( (widget) => 
            <div className='rp-widget-button' key={widget._id} onClick={ () => this.handleClick(widget.name)}>{widget.name}</div>
        )}

        <div className='rp-form-button'>
          <button onClick={ (event) => {
            event.preventDefault();
            dispatch(popupClose()) }} >OK</button>
          </div>
      </div>          
    )
  }
}
export default WidgetForm;
