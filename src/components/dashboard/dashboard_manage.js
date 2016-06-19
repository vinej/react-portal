import React, { Component } from 'react'
import { observer } from "mobx-react";
import DashboardStore from '../../stores/dashboard_store'
import { dispatch } from '../../helpers/dispatcher'
import { dashboardShow, dashboardHide } from '../../actions/dashboard_actions'
import { tabbarClose } from '../../actions/tabbar_actions'
import { popupClose } from '../../actions/popup_actions'
import DashboardModel from '../../models/dashboard_model'

@observer // need observer to update a row when a note is modified
class DashboardManageItem extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    dashboard : React.PropTypes.shape(DashboardModel.shape)
  }

  handleClick(dashboardId, isHidden) {
    console.log(isHidden)
    if (isHidden) {
      dispatch(dashboardShow(dashboardId))
    } else {
      dispatch(tabbarClose(dashboardId))
    }
  }

  getBackGroundColor(isHidden) {
    return { backgroundColor: (isHidden ? 'white' : 'lightgray') }
  }

  render() {
    const dashboard = this.props.dashboard
    return (
      <div style={ this.getBackGroundColor(dashboard.isHidden) } 
        onClick={ () => this.handleClick(dashboard._id, dashboard.isHidden)}>
        {dashboard.title}
      </div>
    );
  }
};

@observer
class DashboardManage extends Component {
  static propTypes = {
    store:  React.PropTypes.instanceOf(DashboardStore)   
  }

  render() {
    return (
      <div>
        <div className="popupHeader"><strong>Show/Hide Dashboards</strong></div>
        { this.props.store.records.map( (dashboard) => 
            <DashboardManageItem key={dashboard._id} dashboard={ dashboard } />
        )}
        <button style={{ 'marginTop': '20px', float :'right' }} onClick={ (event) => {
          event.preventDefault();
          dispatch(popupClose()) }} >Close</button>
      </div>          
    )
  }
}
export default DashboardManage;
