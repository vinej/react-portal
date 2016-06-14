import React, { Component } from 'react'
import { observable, action, transaction } from 'mobx'
import { browserHistory } from 'react-router'
import { authSetAuthorizations } from '../actions/auth_actions'
import { tabbarCloseAll } from '../actions/tabbar_actions'
import { crudGetAll } from '../actions/crud_actions'
import { dispatch } from '../helpers/dispatcher'
import { dashboardStore } from './dashboard_store'
import Form from '../helpers/form'

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
    const token = localStorage.getItem('react-portal-token')
    if (token != null && token != '') {
      const name = localStorage.getItem('react-portal-name')
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
    localStorage.setItem('react-portal-token', token);
    localStorage.setItem('react-portal-name', name);
    transaction( () => {
      authStore.authenticated = true;
      authStore.name = name;
      authStore.errorMessage = '';
    });
    dispatch(authSetAuthorizations(null))
  },

  signOut : function() {
    localStorage.removeItem('react-portal-token');
    localStorage.removeItem('react-portal-name');
    transaction(() => {
      authStore.authenticated = false;
      authStore.name = '';
      authStore.errorMessage = '';
    });
    dispatch(tabbarCloseAll())
  },

  Error : function(error, mainComponentsToRender) {
    transaction(() => {
      if (typeof error === 'object') {
        authStore.errorMessage = error.error;
      } else {
        authStore.errorMessage = error;
      }
      authStore.authenticated = false;
      authStore.name = '';
    })
    if (mainComponentsToRender) {
      // token is not good or an error with authentification
      mainComponentsToRender()
      browserHistory.push('/')
    }
  }
}

export let signUpForm = new Form(
  { email: '',  name: '', password: '', passwordConfirm : '' }, 
  { 
    email: {
      errorMessage: 'Required!',
      fn: (field, fields) => {
        return (field.value || '').length > 0;
      }
    },
    name:  {
      errorMessage: 'Required!',
      fn: (field, fields) => {
        return (field.value || '').length > 0;
      }
    },
    password: {
      fn: (field, fields) => {
        return new Promise((resolve, reject) => {
          if ((field.value || '').length === 0) {
            reject({ error: 'Required!'});
            return;
          }
          if (field.value === fields.email.value) {
            reject({ error: 'Password cannot be the same as the email'});
            return;
          }
          resolve();
        });
      }
    },
    passwordConfirm : {
      errorMessage: 'Both passwords are not equal!',
      fn: (field, fields) => {
        return new Promise((resolve, reject) => {
          if ((field.value || '').length === 0) {
            reject({ error: 'Required!'});
            return;
          }
          if (field.value !== fields.password.value) {
            reject({ error: 'Both passwords are not equal!'});
            return;
          }
          resolve();
        });
      }
    }
})

export let signInForm = new Form({ email: '', password: ''}, {
    email: {
      errorMessage: 'Required!',
      fn: (field, fields) => {
        return (field.value || '').length > 0;
      }
    },
    password: {
      // this is the validation
      fn: (field, fields) => {
        return new Promise((resolve, reject) => {
          // simulate server validation
          setTimeout(() => {
            if ((field.value || '').length === 0) {
              reject({ error: 'Required!'});
              return;
            }
            if (field.value === fields.email.value) {
              reject({ error: 'Password cannot be the same as the email'});
              return;
            }
            resolve();
          }, 2);
        });
      }
    }
})

