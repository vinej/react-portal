import React, { Component } from 'react'
import { popupClose } from '../../actions/popup_actions'
import { dashboardAddDashboard, dashboardRenameDashboard } from '../../actions/dashboard_actions'
import { dispatch } from '../../helpers/dispatcher'

class DashboardForm extends Component {
  constructor() {
    super()
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.state = { dashboardname : "" }
  }

  handleFormSubmit( event ) {
    event.preventDefault();
    if (this.props.action == "add") {
      dispatch(dashboardAddDashboard(this.state.dashboardname))
    } else {
      dispatch(dashboardRenameDashboard(this.state.dashboardname))
    }
    dispatch(popupClose())
  }

  handleOnChange( event ) {
    this.setState( { dashboardname : event.target.value } )
  }

  componentDidMount() {
    this.refs.nameInput.focus();
    this.setState( { dashboardname : this.props.name } )
  }

  render() {
    return (
      <form onSubmit={ this.handleFormSubmit }>
        <div className="popupHeader"><strong>Create a new dashboard</strong></div>
          <fieldset className="form-group">
            <label>Dashboard Name:</label>&nbsp;
            <input  name="dashboardname" 
                    ref="nameInput"
                    className="form-control"
                    value={ this.state.dashboardname }
                    onChange={ this.handleOnChange } />
          </fieldset>
          <button action="submit" className="btn btn-primary">{ this.props.action == 'add' ? 'Create' : 'Rename' }</button>
          <button onClick={ (event) => {
            event.preventDefault();
            dispatch(popupClose()) }} className="btn btn-danger">Cancel</button>
      </form>          
    )
  }
}
export default DashboardForm;
