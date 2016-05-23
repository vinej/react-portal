import React, { Component } from 'react';
import { observer } from "mobx-react";
import { authFormStore, authStore } from '../../stores/auth_store';
import * as actions from '../../actions/auth_actions';
import { connect } from 'react-redux';

class Field extends Component {
  render() {
    return (<fieldset className="form-group">
          <label>{this.props.label}</label>

          <input  name={this.props.name} className="form-control" 
                  onChange={ this.props.change }/>
        </fieldset>
    );
  }
}

@observer
class Signin extends Component {
  constructor() {
    super();
    authFormStore.reset();
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit( event ) {
    event.preventDefault();
    if (authFormStore.isValidateSignIn()) {
      this.props.authSignIn( authFormStore  );
    }
  }

  handleOnChange( event ) {
    // we don't go throught all the flux pattern for simple input because
    // we don't need middleware for this case and there is no
    // business logic related to it.
    authFormStore[event.target.name] = event.target.value;
  }

  renderAlert() {
    if (authStore.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong><span>{authStore.errorMessage}</span>
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
        <fieldset className="form-group">
          <label>Email:</label>&nbsp;
          { authFormStore.emailError && this.renderError(authFormStore.emailError) }
          <input  name="email" 
                  className="form-control"
                  value={ authFormStore.email }
                  onChange={ this.handleOnChange } />
        </fieldset>

        <fieldset className="form-group">
          <label>Password:</label>&nbsp;
          { authFormStore.passwordError && this.renderError(authFormStore.passwordError) }
          <input  name="password" 
                  type="password" 
                  className="form-control"
                  value={ authFormStore.password }
                  onChange={ this.handleOnChange } />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

export default connect(null, actions)(Signin);

