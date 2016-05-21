import React, { Component } from 'react';
import { observer } from "mobx-react";
import { authStore } from '../../stores/auth_store';
import { authFormStore } from '../../stores/auth_store';
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
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

	handleFormSubmit( event ) {
		event.preventDefault();
		this.props.authSignIn( authFormStore  );
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
					<strong>Oops!</strong> {authStore.errorMessage}
				</div>
			);
		}
	}

	render() {
		return (
			<form onSubmit={ this.handleFormSubmit }>
			  <Field name="email" value={authFormStore.email} label="Email:" change={ this.handleOnChange }/>
				<fieldset className="form-group">
					<label>Password:</label>
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

