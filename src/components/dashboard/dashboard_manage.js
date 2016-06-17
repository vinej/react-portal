import React, { Component } from 'react'
import { observer } from "mobx-react";
import { dashboardStore } from '../../stores/dashboard_store'
import { dispatch } from '../../helpers/dispatcher'
import { dashboardShow, dashboardHide } from '../../actions/dashboard_actions'
import { tabbarClose } from '../../actions/tabbar_actions'
import { popupClose } from '../../actions/popup_actions'

@observer // need observer to update a row when a note is modified
class DashboardManageItem extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
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
  render() {
    return (
      <div>
        <div className="popupHeader"><strong>Show/Hide Dashboards</strong></div>
        { dashboardStore.records.map( (dashboard) => 
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
