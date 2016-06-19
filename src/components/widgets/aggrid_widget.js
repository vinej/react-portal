import React, { Component } from 'react'
import { dispatch } from '../../helpers/dispatcher'
import { dashboardRemoveWidget } from '../../actions/dashboard_actions'
import { tabbarShow } from '../../actions/tabbar_actions'
import { pageGetAll } from '../../actions/page_actions'
import Widget from '../dashboard/widget'
import AgGrid from '../grid/ag_grid'
import TodoModel from '../../models/todo_model'
import TodoStore from '../../stores/todo_store'

export default class AgGridWidget extends Component {
  componentWillMount() {
    this.store = TodoStore.create();
  }

  componentWillUnmount() {
    TodoStore.remove(this.store)
    this.store = null;
  }

  render() {
    var component = <AgGrid store={this.store} isRemoveStore={ true } />
    return (
      <Widget title="ag-Grid" 
        onOpenWidgetInTab={() => dispatch(tabbarShow(component,'aggrid',"AgGrid", 'page'))}
        onRemoveWidget={ () => dispatch(dashboardRemoveWidget(this.props.dashboardId, this.props.id))} >
        <AgGrid store={this.store} isRemoveStore={ false } />
      </Widget>  
    )
  }
}

