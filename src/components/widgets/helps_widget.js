import React, { Component } from 'react'
import { dispatch } from '../../helpers/dispatcher'
import { dashboardRemoveWidget } from '../../actions/dashboard_actions'
import { tabbarShow } from '../../actions/tabbar_actions'
import { pageGetAll } from '../../actions/page_actions'
import Widget from '../dashboard/widget'
import Helps from '../help/helps'

class HelpsWidget extends Component {
  render() {
    var component = <Helps />
    return (
      <Widget title="Helps" 
        onOpenWidgetInTab={() => dispatch(tabbarShow(component,'help',"Help", 'page'))}
        onRemoveWidget={ () => dispatch(dashboardRemoveWidget(this.props.dashboardId, this.props.id))} >
        <Helps />
      </Widget>  
    )
  }
}
export default HelpsWidget
