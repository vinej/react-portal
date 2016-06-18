import React, { Component } from 'react'
import { observer, action } from "mobx-react";
import ReactGridLayout from 'react-grid-layout'
import { dashboardStore, getWidgetComponent } from '../../stores/dashboard_store'
import { dispatch } from '../../helpers/dispatcher'
import { crudUpdate } from '../../actions/crud_actions'

@observer
class Dashboard extends Component {
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

  handleOnDragStart(layout) {
    return false
  }

  handleOnLayoutChange(layout) {
    const id = this.props.id
    if (!id) return
    if (this.isDifferent(layout, dashboardStore.getWidgets(id)) === true) {
      console.log("layout change")
      dashboardStore.getDashboard(id).widgets = layout
      dispatch(crudUpdate(dashboardStore, dashboardStore.getDashboard(id)))
    }
  }

  render() {
    var layouts = dashboardStore.getWidgetsLayout(this.props.id)
    if (layouts.length == 0) { 
      return (<div>no widget</div>)
    } else {
      return (
        <ReactGridLayout  className="layout" 
                          layout={layouts} 
                          cols={12} 
                          rowHeight={20} 
                          isDraggable={true}
                          width={1400}
                          onLayoutChange={ this.handleOnLayoutChange }
                          draggableHandle=".widgetheader">
          { layouts.map( widget => 
            <div style={{overflow: 'auto'}} key={widget.i} className="widget">
              { getWidgetComponent(widget.name, this.props.id, widget.i) }
            </div> )
          }
        </ReactGridLayout>
      )
    }
  }
}
export default Dashboard;
