import React, { Component } from 'react'
import { observer } from "mobx-react";
import ReactGridLayout from 'react-grid-layout'
import { dashboardStore } from '../../stores/dashboard_store'
import { dispatch } from '../../helpers/dispatcher'
import { crudUpdate } from '../../actions/crud_actions'

// need to import all available widgets that can be included into a dashboard
import UsersWidget from '../widgets/users_widget'
import TodosWidget from '../widgets/todos_widget'

@observer
class Dashboard extends Component {
  static getWidgetComponent(name) {
    switch (name) {
      case 'TodosWidget':
        return <TodosWidget />
      case 'UsersWidget':
        return <UsersWidget />
    }
  }

  constructor() {
    super()
    this.layout = null
    this.handleOnLayoutChange = this.handleOnLayoutChange.bind(this)
  }

  isDifferent(old, nw) {
    //debugger
    if (!old) return false
    if (!nw) return false
    var isDiff = false
    for(var i = 0; i < old.length; i++) {
       if ( old[i].x !== nw[i].x  || old[i].y !== nw[i].y || old[i].w !== nw[i].w || old[i].h !== nw[i].h)
       { 
          isDiff = true
          break
       }
    }
    return isDiff
  }

  handleOnLayoutChange(layout) {
    console.log('handle layout')
    const idx = this.props.idx
    if (this.isDifferent(layout, dashboardStore.getWidgets(idx)) === true) {
      dashboardStore.getDashboard(idx).widgets = layout
      dispatch(crudUpdate(dashboardStore, dashboardStore.getDashboard(idx)))
    }
  }

  render() {
    console.log('render')
    var layout = dashboardStore.getWidgetsLayout(this.props.idx)
    return (
      <ReactGridLayout  className="layout" 
                        layout={layout} 
                        cols={12} 
                        rowHeight={20} 
                        width={1400}
                        onLayoutChange={ this.handleOnLayoutChange }>
        { layout.map( widget => 
          <div key={widget.i} className="widget">
            { Dashboard.getWidgetComponent(widget.name) }
          </div> )
        }
      </ReactGridLayout>
    )
  }
}
export default Dashboard;
