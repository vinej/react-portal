import React, { Component } from 'react';
import { observer } from 'mobx-react';
import * as actions from '../../actions/auth_actions';
import  { authStore, authFormStore } from '../../stores/auth_store';
import { connect } from 'react-redux';

@observer
class Signup extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit( event ) {
    event.preventDefault();
    this.props.authSignUp( authFormStore  );
  }

  handleOnChange( event ) {
    // don't need actions for input field. 
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

  render() {
    return (
      <form onSubmit={ this.handleFormSubmit }>
        <fieldset className="form-group">
          <label>Email:</label>
          <input 
              className="form-control" 
              name="email"
              onChange={ this.handleOnChange }
              value={ authFormStore.email}
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input  className="form-control" 
                  name="password" 
                  type="password"
                  onChange={ this.handleOnChange }
                  value={ authFormStore.password } />
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input  className="form-control" 
                  name="passwordConfirm" 
                  onChange={ this.handleOnChange }
                  type="password" 
                  value={ authFormStore.passwordConfirm} />
        </fieldset>
        <fieldset className="form-group">
          <label>Name:</label>
          <input  className="form-control" 
                  name="name"
                  onChange={ this.handleOnChange }
                  value={ authFormStore.name } />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}
export default connect(null, actions)(Signup);
