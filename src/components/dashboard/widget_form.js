import React, { Component } from 'react'
import { popupClose } from '../../actions/popup_actions'
import { dashboardAddWidget } from '../../actions/dashboard_actions'
import { dispatch } from '../../helpers/dispatcher'
import WidgetStore from '../../stores/widget_store'
import { FormattedMessage } from 'react-intl'

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
        <div className="rp-popup-header"><FormattedMessage id='db.addwidgets'/></div>
        { this.props.store.getWidgets().map( (widget) => 
            <div className='rp-widget-button' key={widget._id} onClick={ () => this.handleClick(widget.name)}>{widget.name}</div>
        )}

        <div className='rp-form-button'>
          <button onClick={ (event) => {
            event.preventDefault();
            dispatch(popupClose()) }} ><FormattedMessage id='form.ok'/></button>
          </div>
      </div>          
    )
  }
}
export default WidgetForm;
