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
      <div>
        <div className="popupHeader"><strong>add widget to current dashboard</strong></div>
        { this.props.store.getWidgets().map( (widget) => 
            <div className='widgetButton' key={widget._id} onClick={ () => this.handleClick(widget.name)}>{widget.name}</div>
        )}
        <button style={{ 'marginTop': '20px', float :'right' }} onClick={ (event) => {
          event.preventDefault();
          dispatch(popupClose()) }} >OK</button>
      </div>          
    )
  }
}
export default WidgetForm;
