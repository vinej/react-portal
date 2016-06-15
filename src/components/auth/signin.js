require("babel-polyfill")
import React, { Component } from 'react'
import { observer } from "mobx-react"
import { authStore } from '../../stores/auth_store'
import { signinForm } from '../../forms/signin_form'
import { authSignIn } from '../../actions/auth_actions'
import { dispatch } from '../../helpers/dispatcher'

@observer
export default class Signin extends Component {
  async handleSend(form) {
    await form.validate();
    if (form.valid) {
      dispatch(authSignIn( {
        email : form.fields.email.value,
        password  : form.fields.password.value }));      
    }
  }

  componentWillMount() {
    this.form = this.props.form ? this.props.form : signinForm
    this.store = this.props.store ? this.props.store : authStore
  }

  render() {
    const form = this.form
    return (
      <div>
        <fieldset className="form-group">
          <label>Email:</label>&nbsp;
          { form.renderError(form.fields.email.errorMessage) }
          <input  name="email" 
                  className="form-control"
                  value={form.fields.email.value}
                  onChange={(e) => form.fields.email.value = e.target.value}/>
        </fieldset>

        <fieldset className="form-group">
          <label>Password:</label>&nbsp;
          { form.renderError(form.fields.password.errorMessage) }
          <input  name="password" 
                  type="password" 
                  className="form-control"
                  value={form.fields.password.value}
                  onChange={(e) => form.fields.password.value = e.target.value} />
        </fieldset>
        {form.renderAlert(this.store.errorMessage)}
        <button onClick={ () => this.handleSend(form) } 
                className="btn btn-primary"
                disabled={!form.valid} >Sign in</button>
      </div>
    );
  }
}



