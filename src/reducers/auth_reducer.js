import * as t from '../types/auth_types';
import { transaction } from 'mobx';
import { authStore, authFormStore } from '../stores/auth_store';
import { browserHistory } from 'react-router';
import { authSetActions } from '../actions/auth_actions';
import { storeEditTab } from '../actions/base_actions';
import { dispatch } from '../helpers/dispatcher';
import Dashboard from '../components/dashboard/dashboard'
import React, { Component } from 'react';

export default function(action, next) {
  switch(action.type) {
    case t.AUTH_SET_ACTIONS:
      transaction( () => {
        authStore.isActionInit = true;
        authStore.actions = action.payload;
      })
      // now we can render
      if (action.render) {
        action.render();
      }
      browserHistory.push('/main');
      setTimeout( () => {
        var component = <Dashboard />
        dispatch(storeEditTab(null, component, 'Dashboard'))
      }, 1)
      return next(null, action);     
    case t.AUTH_CHECK_TOKEN:
      const token = localStorage.getItem('token');
      if (token) {
        const name = localStorage.getItem('name');
        transaction( () => {
          authStore.authenticated = true;
          authStore.name = name;
          authStore.errorMessage = '';
          dispatch(authSetActions(action.render))
        })
      } else {
        // render but goto home
        action.render();
        browserHistory.push('/');
        //return next(null, action);
      }
      return next(null, action);      
    case t.AUTH_SIGN_IN:
    case t.AUTH_SIGN_UP:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('name', action.payload.name);
      transaction( () => {
        authStore.authenticated = true;
        authStore.name = action.payload.name;
        authStore.errorMessage = '';
      });
      dispatch(authSetActions())
      return next(null, action);      
      //return next(null, action);
    case t.AUTH_SIGN_OUT:
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      transaction(() => {
        authStore.authenticated = false;
        authStore.name = '';
        authStore.errorMessage = '';
      });
      return next(null, action);
    case t.AUTH_ERROR:
      transaction(() => {
        if (typeof action.payload === 'object') {
          authStore.errorMessage = action.payload.error;
        } else {
          authStore.errorMessage = action.payload;
        }
        authStore.authenticated = false;
        authStore.name = '';
      });
      browserHistory.push('/signin');
      return next(null, action);
    case t.AUTH_VALIDATE_SIGN_UP:
      store.validateSignUp();
      return next(null, action);
  }
  return next(null, action);
}


