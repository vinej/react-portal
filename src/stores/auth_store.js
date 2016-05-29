import { observable, action } from 'mobx';

export var authStore = {
  @observable email : "",
  @observable name : "",
  @observable authenticated : false,
  @observable errorMessage : '',

  isActionInit : false,
  actions : [],

  isActionAvailable : function(actiontype) {
    //return true
    if (actiontype.endsWith("_")) {
      actiontype = actiontype.substr(0, actiontype.length - 1);
    }
    return this.actions.indexOf(actiontype) > -1
  }
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

  @action
  reset : function() {
    this.email = "";
    this.name = "";
    this.password = "";
    this.passwordConfirm = "";
    this.emailError = '';
    this.nameError = '';
    this.passwordError = '';
    this.passwordConfirmError = '';
  },

  @action
  isValidateSignUp : function() {
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

    return this.isError === false;
  },

  @action
  isValidateSignIn : function() {
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

    return this.isError === false;
  }
}
