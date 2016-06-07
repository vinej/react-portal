import React, { Component } from 'react'
import { observer } from "mobx-react";
import ReactGridLayout from 'react-grid-layout'
import DashboardStore from '../../stores/dashboard_store'
import { dispatch } from '../../helpers/dispatcher'
import { crudGetAll, crudUpdate } from '../../actions/crud_actions'

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
    this.isStart = false
    this.store = DashboardStore.mount('test')
    this.handleOnLayoutChange = this.handleOnLayoutChange.bind(this)
  }

  componentWillMount() {
    dispatch(crudGetAll(this.store))
  }

  componentWillUnmount() {
    DashboardStore.unmount(this.store)
  }

  isDifferent(old, nw) {
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
    if (this.isDifferent(layout, this.store.records[this.props.idx].widgets) === true) {
      this.store.records[this.props.idx].widgets = layout
      dispatch(crudUpdate(this.store, this.store.records[this.props.idx])) 
    }
  }

  render() {
    if (this.store.records.length == 0) {
      //this.store.records = [ { title:'test', widgets : 
      //    [ { i:'a',x:0,y:0,w:4,h:21,name:'UsersWidget' }, { i:'b',x:4,y:0,w:3,h:21,name:'TodosWidget'} ] } ]
      // testing
      return (
        <div>Loading ...</div>
      )
    }

    var layout = this.store.getWidgetsLayout(this.props.idx)
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
