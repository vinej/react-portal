import { observable } from 'mobx';
import { transaction } from 'mobx';

export var authStore = {
	@observable email : "",
	@observable name : "",
	@observable authenticated : false,
	@observable errorMessage : ''
}

/**
 * [authFormStore is used to fill up the sign in / sign up form]
 * @type {Object}
 */
export var authFormStore = {
	@observable email : "",
	@observable name : "",
	@observable password : "",
	@observable passwordConfirm : "",
	@observable emailError : "",
	@observable nameError : "",
	@observable passwordError : "",
	@observable passwordConfirmError : "",

	isError : false,

	reset : function() {
		transaction( () => {
			this.email = "";
			this.name = "";
			this.password = "";
			this.passwordConfirm = "";
			this.emailError = '';
			this.nameError = '';
			this.passwordError = '';
			this.passwordConfirmError = '';
		});
	},

	isValidateSignUp : function() {
		console.log("validate");
		transaction( () => {
	    this.isError = false;
			this.emailError = '';
			this.nameError = '';
			this.passwordError = '';
			this.passwordConfirmError = '';

	    if (!this.email) {
	      this.emailError = "Enter a email address";
	      this.isError = true;
	    }

	    if (!this.password) {
	      this.passwordError = "Enter a password";
	      this.isError = true;
	    }

	    if (this.password != this.passwordConfirm) {
	      this.passwordConfirmError = "Both password must be equal";
	      this.isError = true;
	    }

	    if (!this.name) {
	      this.nameError = "Enter a name";
	      this.isError = true;
	    }
	  });

	  return this.isError === false;
  },

	isValidateSignIn : function() {
		console.log("validate");
		transaction( () => {
	    this.isError = false;
			this.emailError = '';
			this.passwordError = '';

	    if (!this.email) {
	      this.emailError = "Enter a email address";
	      this.isError = true;
	    }

	    if (!this.password) {
	      this.passwordError = "Enter a password";
	      this.isError = true;
	    }

	  });
	  return this.isError === false;
  }
}
