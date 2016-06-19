import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { observer } from "mobx-react"
import { pageGetAll, pagePrevious, pageNext } from '../../actions/page_actions'
import { dispatch } from '../../helpers/dispatcher'
import { popupShow } from '../../actions/popup_actions'
import TodoView from '../todo/todo_view'
import { todoForm } from '../../forms/todo_form'
import TodoModel from '../../models/todo_model'
import TodoStore from '../../stores/todo_store'

@observer
export default class AgGrid extends Component {
  constructor() {
    super()
    this.handleAdd = this.handleAdd.bind(this)
  }

  static propTypes = {
    store:          React.PropTypes.instanceOf(TodoStore),
    isRemoveStore : React.PropTypes.bool      // true means that the store must be delete here
                                              // false means that the store will be deleted by the parent
  }

  handleAdd() {
    var component = <TodoView store={this.props.store} todo={TodoModel.create()} form={todoForm} />
    dispatch(popupShow(component, TodoStore.getEditFormDimension()))
  }

  componentWillMount() {
    dispatch(pageGetAll(this.props.store))
  }

  componentWillUnmount() {
    if (this.isRemoveStore === true)  {
      TodoStore.remove(this.props.store);
      this.props.store = null;
    }
  }

  render() {
    return (
      <div className="ag-bootstrap" style={{height: "330px" }}>
        <AgGridReact
          // listen for events with React callbacks
          //onRowSelected={this.onRowSelected.bind(this)}
          //onCellClicked={this.onCellClicked.bind(this)}

          // binding to properties within React State or Props
          //showToolPanel="true"
          //quickFilterText="true"
          //icons={this.state.icons}

          // column definitions and row data are immutable, the grid
          // will update when these lists change
          columnDefs = {[
              {headerName: 'Description', field: 'description'},
              {headerName: 'Status', field: 'status'}
          ]}

          rowData = { this.props.store.page }

          // or provide props the old way with no binding
          rowSelection="multiple"
          enableSorting="true"
          enableFilter="true"
          rowHeight="30"
        />
        <button onClick={ () => dispatch(pagePrevious(this.props.store)) }>prev</button>
        <button onClick={ () => dispatch(pageNext(this.props.store)) }>next</button>
        <button onClick={ () => this.handleAdd() }>add</button>
      </div>
    )
  }
}

