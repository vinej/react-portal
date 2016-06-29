import React, { Component } from 'react'
import { observer } from "mobx-react"
import { dispatch } from '../../helpers/dispatcher'
import { authSignIn } from '../../actions/auth_actions'
import Form from '../../forms/form'
import AuthStore from '../../stores/auth_store'
import { FormattedMessage } from 'react-intl'

@observer
export default class Signin extends Component {
  async handleSend(event,form) {
    event.preventDefault()
    await form.validate();
    if (form.valid) {
      dispatch(authSignIn( {
        email     : form.fields.email.value,
        password  : form.fields.password.value }));      
    }
  }

  static propTypes = {
    form:   React.PropTypes.instanceOf(Form),      
    store:  React.PropTypes.instanceOf(AuthStore)  
  }

  render() {
    const form = this.props.form
    if (!form) { return <div />}
    return (
      <form className='rp-form-small'>
        <div className='rp-popup-header'><FormattedMessage id="app.signin"/></div>
        <div>
          <label required><FormattedMessage id="auth.email"/></label>
          <input name="email" 
                 value={form.fields.email.value}
                 onChange={(e) => form.fields.email.value = e.target.value}/>
          { form.renderError(form.fields.email.errorMessage) }
        </div>

        <div>
          <label required><FormattedMessage id="auth.password"/></label>
          <input name="password" 
                  type="password" 
                  value={form.fields.password.value}
                  onChange={(e) => form.fields.password.value = e.target.value} />
          { form.renderError(form.fields.password.errorMessage) }
        </div>
        <div>
          <button
            className='kna-btn'
              onClick={ (event) => this.handleSend(event,form) } 
              disabled={!form.valid} ><FormattedMessage id="app.signin"/></button>
        </div>
        {form.renderAlert(this.props.store.errorMessage)}
      </form>
    )
  }
}



