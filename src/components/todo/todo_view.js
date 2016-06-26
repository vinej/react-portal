require("babel-polyfill")
import React, { Component } from 'react'
import { observer } from "mobx-react"
import TodoStore from '../../stores/todo_store'
import { pageUpdateRecord, pageAddRecord } from '../../actions/page_actions'
import { popupClose } from '../../actions/popup_actions'
import { dispatch } from '../../helpers/dispatcher'
import TodoModel from '../../models/todo_model'
import Form from '../../forms/form'
import { FormattedMessage, injectIntl } from 'react-intl'

@observer
class TodoView extends Component {
  async handleSend(event,form) {
    event.preventDefault()
    await form.validate();
    if (form.valid) {
      var todo = this.props.todo
      TodoModel.setTodoModel(form.fields, todo)
      if (todo._id) {
        dispatch(pageUpdateRecord(this.props.store, todo))
      } else {
        dispatch(pageAddRecord(this.props.store, todo))
      }
      dispatch(popupClose())
    }
  }

  static propTypes = {
    form:   React.PropTypes.instanceOf(Form),      
    store:  React.PropTypes.instanceOf(TodoStore),  
    todo:  React.PropTypes.shape(TodoModel.shape())  
  }

  componentWillMount() {
    TodoModel.setFormFields(this.props.todo, this.props.form.fields)
  }

  componentDidMount() {
    this.refs.nameInput.focus();
  }

  render() {
    const form = this.props.form
    const { formatMessage } = this.props.intl;
    return (
      <form className='rp-form-small'>
        <div className="rp-popup-header">Todo</div>
        <div>
          <label required><FormattedMessage id='todo.description'/></label>&nbsp;
          <input  ref="nameInput"
                  name="description" 
                  value={form.fields.description.value}
                  onChange={(e) => form.fields.description.value = e.target.value}/>
          { form.renderError(form.fields.description.errorMessage) }
        </div>
        <div>
          <label><FormattedMessage id='todo.status'/></label>
          <select name="status" 
                  value={form.fields.status.value}
                  onChange={(e) => form.fields.status.value = e.target.value} >
            <option value="waiting">{ formatMessage( { id : 'todo.waiting'} ) }</option>
            <option value="suspended">{ formatMessage( { id : 'todo.suspended' } ) }</option>
            <option value="freezed">{ formatMessage( { id : 'todo.freezed'} ) }</option>
            <option value="completed">{ formatMessage( { id : 'todo.completed'}) }</option>
          </select>
          { form.renderError(form.fields.status.errorMessage) }
        </div>
        <div  className='rp-form-button'>
          <button onClick={ (event) => this.handleSend(event,form) } 
                  disabled={!form.valid} ><FormattedMessage id='form.save'/></button>
          <button onClick={ (event) => { event.preventDefault(); dispatch(popupClose()); } }  
                  ><FormattedMessage id='form.cancel'/></button>
        </div>
        {form.renderAlert(this.props.store.error)}
      </form>
    );
  }
}
export default injectIntl(TodoView)

