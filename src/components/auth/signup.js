require("babel-polyfill")
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { authSignUp } from '../../actions/auth_actions'
import { dispatch } from '../../helpers/dispatcher'
import Form from '../../forms/form'
import AuthStore from '../../stores/auth_store'
import { FormattedMessage } from 'react-intl'

@observer
export default class Signup extends Component {
  async handleSend(event,form) {
    event.preventDefault();
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
      <form className='rp-form-small'>
        <div className='rp-popup-header'><FormattedMessage id="app.signup"/></div>
        <div>
          <label required><FormattedMessage id="form.email"/></label>
          <input  name="email"
                  value={form.fields.email.value}
                  onChange={(e) => form.fields.email.value = e.target.value}/>
          { form.renderError(form.fields.email.errorMessage) }
        </div>
        <div>
          <label required><FormattedMessage id="form.password"/></label>
          <input  name="password" 
                  type="password"
                  value={form.fields.password.value}
                  onChange={(e) => form.fields.password.value = e.target.value}/>
          { form.renderError(form.fields.password.errorMessage) }
        </div>
        <div>
          <label required><FormattedMessage id="form.confirm"/></label>
          <input  name="passwordConfirm" 
                  type="password" 
                  value={form.fields.passwordConfirm.value}
                  onChange={(e) => form.fields.passwordConfirm.value = e.target.value}/>
          { form.renderError(form.fields.passwordConfirm.errorMessage) }
        </div>
        <div>
          <label required><FormattedMessage id="form.name"/></label>
          <input  name="name"
                  value={form.fields.name.value}
                  onChange={(e) => form.fields.name.value = e.target.value}/>
          { form.renderError(form.fields.name.errorMessage) }
        </div>
        {form.renderAlert(this.props.store.errorMessage)}
        <div>
          <button onClick={ (event) => this.handleSend(event,form) } 
                  disabled={!form.valid} ><FormattedMessage id="app.signup"/></button>
        </div>
      </form>
    );
  }
}

