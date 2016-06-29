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
import { FormattedMessage, injectIntl } from 'react-intl'

class WidgetTool extends Component {

  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  getAskDeleteMsg() {
    return <FormattedMessage id="db.askdelete" values= {{ name : dashboardStore.getDashboardTitle() }} />
  }

  handleOnChange(e) {
    switch(e.target.value) {
      case 'create' :
        dispatch(popupShow( () => <DashboardForm action="add" dashboard_name="" /> ))
        break;
      case 'rename' :
        dispatch(popupShow( () => <DashboardForm  action="rename" dashboard_name={dashboardStore.getDashboardTitle()} /> ))
        break;
      case 'show_hide' :
        dispatch(popupShow( () => <DashboardManage store={dashboardStore} />))
        break;
      case 'delete' :
        dispatch(popupShow( () => <PopupYesNo title={ <FormattedMessage id="db.delete"/> }
          msg={ this.getAskDeleteMsg() } yesAction={ dashboardDelete }
          />))
        break;
      case 'add_widget' :
        dispatch(popupShow( () => <WidgetForm store={widgetStore} />))
        break;
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <select className='rp-widget-tool' onChange={ this.handleOnChange } value='0'>
          <option value='0' disabled="true">{ formatMessage({ id: 'db.dashboard' }) }</option>
          <option value='create'>{ formatMessage({ id: 'db.create' } ) }</option>
          <option value='rename'>{ formatMessage({ id: 'db.rename' } ) }</option>
          <option value='delete'>{ formatMessage({ id: 'db.delete' } ) }</option>
          <option value='show_hide'>{ formatMessage({ id: 'db.showhide' } ) }</option> 
          <option value='add_widget'>{ formatMessage({ id: 'db.addwidgets' } ) }</option> 
        </select>
      </div>
    )
  }
}
export default injectIntl(WidgetTool);
