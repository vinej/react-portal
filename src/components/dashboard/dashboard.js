import React, { Component } from 'react'
import ReactGridLayout from 'react-grid-layout'
import WidgetStore from '../../stores/widget_store'
import { dispatch } from '../../helpers/dispatcher'
import { crudGetAll } from '../../actions/crud_actions'

// need to import all available widgets that can be included into a dashboard
import UsersWidget from '../widgets/users_widget'
import TodosWidget from '../widgets/todos_widget'

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
    this.store = WidgetStore.mount('test')
  }

  componentWillMount() {
    //dispatch(crudGetAll(this.store))
  }

  componentWillUnmount() {
    WidgetStore.unmount(this.store)
  }

  render() {
    var layout = this.store.getLayout()
    return (
      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={20} width={1400}>
        { this.store.records.map( widget => 
          <div key={widget.key} className="widget">
            { Dashboard.getWidgetComponent(widget.name) }
          </div> )
        }
      </ReactGridLayout>
    )
  }
}
export default Dashboard;
