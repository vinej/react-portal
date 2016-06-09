import React, { Component } from 'react'
import Todos from '../todo/todos'
import { dispatch } from '../../helpers/dispatcher'
import { removeWidget } from '../../actions/dashboard_actions'
import { tabbarShow } from '../../actions/tabbar_actions'
import { pageGetAll } from '../../actions/page_actions'
import Widget from '../dashboard/widget'

class TodosWidget extends Component {
  render() {
    var component = <Todos />
    return (
      <Widget title="My Todos" 
        onOpenWidgetInTab={() => dispatch(tabbarShow(component,"Todo"))}
        onRemoveWidget={ () => dispatch(removeWidget(this.props.dashboardId, this.props.id))}
        onRefreshWidget= {() => dispatch(pageGetAll("todo"))} >
        <Todos />
      </Widget>  
    )
  }
}
export default TodosWidget
