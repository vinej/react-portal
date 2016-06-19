require("babel-polyfill")
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { authSignUp } from '../../actions/auth_actions'
import { dispatch } from '../../helpers/dispatcher'

import Form from '../../forms/form'
import AuthStore from '../../stores/auth_store'

@observer
export default class Signup extends Component {
  async handleSend(form) {
    await form.validate();
    if (form.valid) {
      dispatch(authSignUp( {
        email : form.fields.email.value,
        name : form.fields.name.value,
        password  : form.fields.password.value }));      
    }
  }

  static propTypes = {
    form:   React.PropTypes.instanceOf(Form),      
    store:  React.PropTypes.instanceOf(AuthStore)  
  }

  render() {
    const form = this.props.form
    return (
      <div>
        <fieldset className="form-group">
          <label>Email:</label>&nbsp;
          { form.renderError(form.fields.email.errorMessage) }
          <input 
              className="form-control" 
              name="email"
              value={form.fields.email.value}
              onChange={(e) => form.fields.email.value = e.target.value}/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>&nbsp;
          { form.renderError(form.fields.password.errorMessage) }
          <input  className="form-control" 
                  name="password" 
                  type="password"
                  value={form.fields.password.value}
                  onChange={(e) => form.fields.password.value = e.target.value}/>
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>&nbsp;
          { form.renderError(form.fields.passwordConfirm.errorMessage) }
          <input  className="form-control" 
                  name="passwordConfirm" 
                  type="password" 
                  value={form.fields.passwordConfirm.value}
                  onChange={(e) => form.fields.passwordConfirm.value = e.target.value}/>
        </fieldset>
        <fieldset className="form-group">
          <label>Name:</label>&nbsp;
          { form.renderError(form.fields.name.errorMessage) }
          <input  className="form-control" 
                  name="name"
                  value={form.fields.name.value}
                  onChange={(e) => form.fields.name.value = e.target.value}/>
        </fieldset>
        {form.renderAlert(this.props.store.errorMessage)}
        <button onClick={ () => this.handleSend(form) } 
                className="btn btn-primary"
                disabled={!form.valid} >Sign Up</button>
      </div>
    );
  }
}

