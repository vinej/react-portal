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
    authFormStore[event.target.name] = event.target.value;
  }

  renderAlert() {
    if (authStore.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {authStore.errorMessage}
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
          {authFormStore.emailError && <div className="error">{authFormStore.emailError}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input  className="form-control" 
                  name="password" 
                  type="password"
                  onChange={ this.handleOnChange }
                  value={ authFormStore.password } />
          {authFormStore.passwordError && <div className="error">{authFormStore.passwordError}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input  className="form-control" 
                  name="passwordConfirm" 
                  onChange={ this.handleOnChange }
                  type="password" 
                  value={ authFormStore.passwordConfirm} />
          {authFormStore.passwordConfirmError && <div className="error">{authFormStore.passwordConfirmError}</div>}
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

// function validate(authStore) {
//   var isError = false;

//   if (!authFormUser.email) {
//     authFormUser.emailError = 'Please enter an email';
//     isError = true;
//   }

//   if (!authFormUser.password) {
//     authFormUser.passwordError = 'Please enter a password';
//     isError = true;
//   }

//   if (!authFormUser.name) {
//     authFormUser.nameError = 'Please enter a name';
//     isError = true;
//   }

//   if (!authFormUser.passwordConfirm) {
//     authFormUser.passwordConfirmError = 'Please enter a password confirmation';
//     isError = true;
//   }

//   if (authFormUser.password !== authFormUser.passwordConfirm) {
//     authFormUser.passwordError= 'Passwords must match';
//     isError = true;
//   }

//   return isError;
// }

export default connect(null, actions)(Signup);
