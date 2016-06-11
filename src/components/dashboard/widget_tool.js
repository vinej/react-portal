import React, { Component } from 'react'
import { widgetStore } from '../../stores/widget_store'
import { dispatch } from '../../helpers/dispatcher'
import { popupShow } from '../../actions/popup_actions'
import WidgetForm from './widget_form'

class WidgetTool extends Component {

  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e) {
    console.log(e)
    switch(e.target.value) {
      case 'create' :
        break;
      case 'show' :
        break;
      case 'add' :
        dispatch(popupShow( <WidgetForm />, { width: '40%', height: '200px', left: '60%', top: '100px' }))
        break;
    }
  }

  render() {
    return (
      <select style={{ 'marginTop': '7px'}} onChange={ this.handleOnChange } value='0'>
        <option value='0' disabled="true">Choose an option</option>
        <option value='create'>Create Dashboard</option>
        <option value='show'>Show/Hide Dashboard</option> 
        <option value='add'>Add Widget to current Dashboard</option> 
      </select>
    )
  }
}
export default WidgetTool;
