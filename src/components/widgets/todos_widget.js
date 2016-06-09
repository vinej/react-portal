import React, { Component } from 'react'
import Todos from '../todo/todos'
import { dispatch } from '../../helpers/dispatcher'
import { tabbarShow } from '../../actions/tabbar_actions'
import { pageGetAll } from '../../actions/page_actions'
import Widget from '../dashboard/widget'

class TodosWidget extends Component {
  render() {
    var component = <Todos />
    return (
      <Widget title="My Todos" 
        onOpenInTab={() => dispatch(tabbarShow(component,"Todo"))}
        onRefresh= {() => dispatch(pageGetAll("todo"))} >
        <Todos />
      </Widget>  
    )
  }
}
export default TodosWidget
