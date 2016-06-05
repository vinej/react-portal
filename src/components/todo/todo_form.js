import React, { Component } from 'react'
import { observer } from "mobx-react"
import TodoStore from '../../stores/todo_store'
import { baseUpdate, baseAdd } from '../../actions/base_actions'
import { popupClose } from '../../actions/popup_actions'
import { dispatch } from '../../helpers/dispatcher'
import ReactDOM from 'react-dom'

@observer
class TodoForm extends Component {
  constructor() {
    super();
    this.formStore = {}
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillMount() {
    this.formStore = TodoStore.getFormStore(this.props.todo)
  }

  componentDidMount() {
    this.refs.nameInput.focus();
  }

  handleFormSubmit( event ) {
    event.preventDefault();
    if (this.formStore.isValidate()) {
      var todo = this.formStore.getTodo()
      if (todo._id) {
        dispatch(baseUpdate(this.props.mstore, todo))
      } else {
        dispatch(baseAdd(this.props.mstore, todo))
      }
      dispatch(popupClose())
    }
  }

  handleOnChange( event ) {
    // we don't go throught all the flux pattern for simple input because
    // we don't need middleware for this case and there is no
    // business logic related to it.
    this.formStore[event.target.name] = event.target.value;
  }

  renderAlert() {
    if (this.formStore.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong><span>{this.formStore.errorMessage}</span>
        </div>
      );
    }
  }

  renderError(error) {
    return (
      <span>
        <span className='text-danger'>{error}</span>
        <i className="fa fa-exclamation text-danger" />
      </span>
    );
  }

  render() {
    return (
      <form onSubmit={ this.handleFormSubmit }>
        <div className="popupHeader"><strong>Todo</strong></div>
        <fieldset className="form-group">
          <label>Description:</label>&nbsp;
          { this.formStore.descriptionError && this.renderError(this.formStore.descriptionError) }
          <input  ref="nameInput"
                  name="description" 
                  className="form-control"
                  value={ this.formStore.description }
                  onChange={ this.handleOnChange } />
        </fieldset>

        <fieldset className="form-group">
          <label>Status:</label>&nbsp;
          { this.formStore.statusError && this.renderError(this.formStore.statusError) }
          <select name="status" 
                  className="form-control"
                  value={ this.formStore.status }
                  onChange={ this.handleOnChange } >
            <option value="waiting">Waiting</option>
            <option value="suspend">Suspend</option>
            <option value="freeze">Freeze</option>
            <option value="completed">Completed</option>
          </select>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Save</button>
        <button onClick={ (event) => {
          event.preventDefault();
          dispatch(popupClose()) }} className="btn btn-danger">Cancel</button>
      </form>
    );
  }
}
export default TodoForm;

