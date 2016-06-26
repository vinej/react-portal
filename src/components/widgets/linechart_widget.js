import React, { Component } from 'react'
import { dispatch } from '../../helpers/dispatcher'
import { dashboardRemoveWidget } from '../../actions/dashboard_actions'
import { tabbarShow } from '../../actions/tabbar_actions'
import Widget from '../dashboard/widget'
import LineChart from '../charts/line_chart'

export default class LineChartWidget extends Component {
  render() {
    var component = <LineChart />
    return (
      <Widget title="LineChart : ChartJS"
        onOpenWidgetInTab={() => dispatch(tabbarShow(component,'linechart',"LineChart", 'page'))}
        onRemoveWidget={ () => dispatch(dashboardRemoveWidget(this.props.dashboardId, this.props.id))} >
        <LineChart />
      </Widget>  
    )
  }
}
