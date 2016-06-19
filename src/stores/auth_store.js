import React, { Component } from 'react'
import { observable, action, transaction } from 'mobx'
import { browserHistory } from 'react-router'
import { authSetAuthorizations } from '../actions/auth_actions'
import { tabbarCloseAll } from '../actions/tabbar_actions'
import { crudGetAll } from '../actions/crud_actions'
import { dispatch } from '../helpers/dispatcher'
import { dashboardStore } from './dashboard_store'

export default class AuthStore {
  @observable email : ""
  @observable name : ""
  @observable authenticated : false
  @observable errorMessage : ''

  isAutorizationInit : false
  authorizations : []

  isActionAvailable(actiontype) {
    return true
    // if (actiontype.endsWith("_")) {
    //   actiontype = actiontype.substr(0, actiontype.length - 1);
    // }
    // return this.actions.indexOf(actiontype) > -1
  }

  setAuthorizations(authorizations, mainComponentsToRender) {
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
  }

  checkToken(mainComponentsToRender) {
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
  }

  signInOrUp(token, name) {
    localStorage.setItem('react-portal-token', token);
    localStorage.setItem('react-portal-name', name);
    transaction( () => {
      authStore.authenticated = true;
      authStore.name = name;
      authStore.errorMessage = '';
    });
    dispatch(authSetAuthorizations(null))
  }

  signOut() {
    localStorage.removeItem('react-portal-token');
    localStorage.removeItem('react-portal-name');
    transaction(() => {
      authStore.authenticated = false;
      authStore.name = '';
      authStore.errorMessage = '';
    });
    dispatch(tabbarCloseAll())
  }

    transaction(() => {
      if (mainComponentsToRender) {
        authStore.errorMessage = ''
      } else {
        if (typeof error === 'object') {
          authStore.errorMessage = error.error;
        } else {
          authStore.errorMessage = error;
        }
      }
      authStore.authenticated = false;
      authStore.name = '';
    })
    if (mainComponentsToRender) {
      // token is not good or an error with authentification
      // the first time don't show an error 
      mainComponentsToRender()
      browserHistory.push('/')
    }
  }
}
export let authStore = new AuthStore()