import React, { Component } from 'react'
import { dashboardStore } from '../../stores/dashboard_store'
import PopupStore, { popupStore } from '../../stores/popup_store'
import { dispatch } from '../../helpers/dispatcher'
import { popupShow } from '../../actions/popup_actions'
import { dashboardDelete } from '../../actions/dashboard_actions'
import WidgetForm from './widget_form'
import PopupYesNo from '../popups/popup_yesno'
import DashboardForm from './dashboard_form'
import DashboardManage from './dashboard_manage'
import { widgetStore } from '../../stores/widget_store'
import { tabbarStore} from '../../stores/tabbar_store'

class WidgetTool extends Component {

  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e) {
    switch(e.target.value) {
      case 'create' :
        dispatch(popupShow( <DashboardForm action="add" title="" />, 
                            PopupStore.getStandardDimension()))
        break;
      case 'rename' :
        dispatch(popupShow( <DashboardForm  action="rename" title={ tabbarStore.getCurrentTitle() } />, 
                            PopupStore.getStandardDimension()))
        break;
      case 'show_hide' :
        dispatch(popupShow( <DashboardManage store={dashboardStore} />, 
                            PopupStore.getStandardDimension()))
        break;
      case 'delete' :
        dispatch(popupShow( <PopupYesNo 
          title="Delete Dashboard"  
          msg={ "Do you want to delete the dashboard <" + dashboardStore.getDashboardTitle() + "> ?" }
          yesAction={ dashboardDelete }
          />, PopupStore.getSmallDimension()))
        break;
      case 'add' :
        dispatch(popupShow( <WidgetForm store={widgetStore} />, 
                            PopupStore.getStandardDimension()))
        break;
    }
  }

  render() {
    return (
      <select className='widget-tool' onChange={ this.handleOnChange } value='0'>
        <option value='0' disabled="true">Dashboard</option>
        <option value='create'>Create a new Dashboard</option>
        <option value='rename'>Rename the current Dashboard</option>
        <option value='delete'>Delete the current Dashboard</option>
        <option value='show_hide'>Show/Hide Dashboards</option> 
        <option value='add'>Add Widgets to current Dashboard</option> 
      </select>
    )
  }
}
export default WidgetTool;
