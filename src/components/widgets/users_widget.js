import React, { Component } from 'react';
import Users from '../user/users';
import { dispatch } from '../../helpers/dispatcher'
import { tabbarShow } from '../../actions/tabbar_actions'
import { pageGetAll } from '../../actions/page_actions'
import Widget from '../dashboard/widget'

class UsersWidget extends Component {
  render() {
    var component = <Users />
    return (
      <Widget title="Users list" 
        onOpenInTab={() => dispatch(tabbarShow(component,"Users"))}
        onRefresh= {() => dispatch(pageGetAll("user"))}  >
        <Users />
      </Widget>  
    )
  }
}
export default UsersWidget;
