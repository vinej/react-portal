import React, { Component } from 'react'
import { observer } from "mobx-react"
import { pageGetAll, pagePrevious, pageNext } from '../../actions/page_actions'
import { popupShow } from '../../actions/popup_actions'
import { dispatch } from '../../helpers/dispatcher'
import { todoForm } from '../../forms/todo_form'
import Todo from './todo'
import TodoStore from '../../stores/todo_store'
import TodoView from './todo_view'
import TodoModel from '../../models/todo_model'
import { FormattedMessage } from 'react-intl'

@observer  // need observer when we add, delete rows
class Todos extends Component {
  constructor() {
    super()
    this.handleAdd = this.handleAdd.bind(this)
  }

  static propTypes = {
    store:          React.PropTypes.instanceOf(TodoStore),
    isRemoveStore : React.PropTypes.bool      // true means that the store must be delete here
                                              // false means that the store will be deleted by the parent
  }

  componentWillMount() {
    dispatch(pageGetAll(this.props.store))
  }

  componentWillUnmount() {
    if (this.props.isRemoveStore === true) {
      TodoStore.remove(this.props.store)
    }
  }

  handleAdd() {
    var component = () => <TodoView store={this.props.store} todo={TodoModel.create()} form={todoForm} />
    dispatch(popupShow(component, TodoStore.getEditFormDimension()))
  }

  render() {
    const store = this.props.store
    return ( 
      <div style={{ height: '400px'}}>
        <table>
          <thead >
            <tr><th><i className="fa fa-edit" /></th>
            <th><FormattedMessage id='todo.description'/></th>
            <th><FormattedMessage id='todo.status'/></th>
            <th><i className="fa fa-trash" /></th></tr>
          </thead>
          {/* note: always need a key */} 
          <tbody>
            { store.page.map( todo => 
              <Todo key={todo._id} todo={todo} store={store} />
              )
            }
          </tbody>
        </table>
        <button onClick={ () => dispatch(pagePrevious(store)) }><FormattedMessage id='form.prev'/></button>
        <button onClick={ () => dispatch(pageNext(store)) }><FormattedMessage id='form.next'/></button>
        <button onClick={ () => this.handleAdd() }><FormattedMessage id='form.add'/></button>
      </div>
    )
  }
};
export default Todos

