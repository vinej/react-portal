import React, { Component } from 'react'
import Users from '../user/users'
import { dispatch } from '../../helpers/dispatcher'
import { tabbarShow } from '../../actions/tabbar_actions'
import { removeWidget } from '../../actions/dashboard_actions'
import { pageGetAll } from '../../actions/page_actions'
import Widget from '../dashboard/widget'

class UsersWidget extends Component {
  render() {
    var component = <Users />
    return (
      <Widget title="Users list" 
        onOpenWidgetInTab={ () => dispatch(tabbarShow(component , "", "Users", "page"))}
        onRemoveWidget={ () => dispatch(removeWidget(this.props.dashboardId, this.props.id))}
        onRefreshWidget= { () => dispatch(pageGetAll("user"))}  >
        <Users />
      </Widget>  
    )
  }
}
export default UsersWidget
