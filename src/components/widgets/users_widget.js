import React, { Component } from 'react'
import Users from '../user/users'
import { dispatch } from '../../helpers/dispatcher'
import { tabbarShow } from '../../actions/tabbar_actions'
import { dashboardRemoveWidget } from '../../actions/dashboard_actions'
import { pageGetAll } from '../../actions/page_actions'
import Widget from '../dashboard/widget'
import  UserStore from '../../stores/user_store';

export default class UsersWidget extends Component {
  componentWillMount() {
    this.store = UserStore.create();
  }

  componentWillUnmount() {
    UserStore.remove(this.store)
    this.store = null;
  }

  render() {
    var component = <Users store={ this.store } isRemoveStore={ true } />
    return (
      <Widget title="Users list" 
        onOpenWidgetInTab={ () => dispatch(tabbarShow(component , "user", "Users", "page"))}
        onRemoveWidget={ () => dispatch(dashboardRemoveWidget(this.props.dashboardId, this.props.id))}
        onRefreshWidget= { () => dispatch(pageGetAll("user"))}  >
        <Users  store={ this.store } isRemoveStore={ false } />
      </Widget>  
    )
  }
}

