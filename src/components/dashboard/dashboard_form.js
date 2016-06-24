import React, { Component } from 'react'
import { popupClose } from '../../actions/popup_actions'
import { dashboardAddDashboard, dashboardRenameDashboard } from '../../actions/dashboard_actions'
import { dispatch } from '../../helpers/dispatcher'

class DashboardForm extends Component {
  constructor() {
    super()
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.state = { dashboardTitle : "" }
  }

  static propTypes = {
    title:  React.PropTypes.string,       // the title of the dashboard
    action: React.PropTypes.oneOf(['add', 'rename'])
  }

  handleFormSubmit( event ) {
    event.preventDefault();
    if (this.props.action == "add") {
      dispatch(dashboardAddDashboard(this.state.dashboardTitle))
    } else {
      dispatch(dashboardRenameDashboard(this.state.dashboardTitle))
    }
    dispatch(popupClose())
  }

  handleOnChange( event ) {
    this.setState( { dashboardTitle : event.target.value } )
  }

  componentDidMount() {
    this.refs.nameInput.focus();
    this.setState( { dashboardTitle : this.props.dashboard_name } )
  }

  render() {
    return (
      <form className='rp-form-small' onSubmit={ this.handleFormSubmit }>
        <div className="rp-popup-header">
          { this.props.action == 'add' ? 'Create a new dashboard' : 'Rename the current dashboard' }
        </div>
        <div>
          <label>Dashboard Name</label>&nbsp;
          <input  name="dashboardTitle" 
                  ref="nameInput"
                  value={ this.state.dashboardTitle }
                  onChange={ this.handleOnChange } />
        </div>
        <div className='rp-form-button'>
          <button action="submit">{ this.props.action == 'add' ? 'Create' : 'Rename' }</button>
          <button onClick={ (event) => {
            event.preventDefault();
            dispatch(popupClose()) }}>Cancel</button>
        </div>
      </form>          
    )
  }
}
export default DashboardForm;
