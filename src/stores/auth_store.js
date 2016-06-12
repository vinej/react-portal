import React, { Component } from 'react'
import { observable, action, transaction } from 'mobx'
import { browserHistory } from 'react-router'
import { authSetAuthorizations } from '../actions/auth_actions'
import { tabbarCloseAll } from '../actions/tabbar_actions'
import { crudGetAll } from '../actions/crud_actions'
import { dispatch } from '../helpers/dispatcher'
import { dashboardStore } from './dashboard_store'

export var authStore = {
  @observable email : "",
  @observable name : "",
  @observable authenticated : false,
  @observable errorMessage : '',

  isAutorizationInit : false,
  authorizations : [],

  isActionAvailable : function(actiontype) {
    return true
    // if (actiontype.endsWith("_")) {
    //   actiontype = actiontype.substr(0, actiontype.length - 1);
    // }
    // return this.actions.indexOf(actiontype) > -1
  },

  setAuthorizations : function(authorizations, mainComponentsToRender) {
    transaction( () => {
      this.isAutorizationInit = true
      this.authorizations = authorizations
    })
    // now we can render main, but it could be null
    if (mainComponentsToRender) {
      mainComponentsToRender()
    }
    browserHistory.push('/main')
    dispatch(crudGetAll(dashboardStore))
  },

  checkToken : function(mainComponentsToRender) {
    const token = localStorage.getItem('token')
    if (token) {
      const name = localStorage.getItem('name')
      transaction( () => {
        authStore.authenticated = true
        authStore.name = name
        authStore.errorMessage = ''
        dispatch(authSetAuthorizations(mainComponentsToRender))
      })
    } else {
      // render the main, but stay on root to 
      // SignUn or SignUp
      mainComponentsToRender()
      browserHistory.push('/')
    }
  },

  signInOrUp : function(token, name) {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    transaction( () => {
      authStore.authenticated = true;
      authStore.name = name;
      authStore.errorMessage = '';
    });
    dispatch(authSetAuthorizations(null))
  },

  signOut : function() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    transaction(() => {
      authStore.authenticated = false;
      authStore.name = '';
      authStore.errorMessage = '';
    });
    dispatch(tabbarCloseAll())
  },

  Error : function(error) {
    transaction(() => {
      if (typeof error === 'object') {
        authStore.errorMessage = error.error;
      } else {
        authStore.errorMessage = error;
      }
      authStore.authenticated = false;
      authStore.name = '';
    });
    browserHistory.push('/signin');
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
