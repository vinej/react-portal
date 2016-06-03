import * as t from '../types/auth_types';
import { transaction } from 'mobx';
import { authStore, authFormStore } from '../stores/auth_store';
import { browserHistory } from 'react-router';
import { authSetAuthorizations } from '../actions/auth_actions';
import { storeEditTab } from '../actions/base_actions';
import { dispatch } from '../helpers/dispatcher';
import Dashboard from '../components/dashboard/dashboard'
import React, { Component } from 'react';

export default function(action, next) {
  switch(action.type) {
    case t.AUTH_SET_AUTHORIZATIONS:
      authStore.setAuthorizations(action.payload, action.render)
      break;
    case t.AUTH_CHECK_TOKEN:
      authStore.checkToken(action.render)
      break;
    case t.AUTH_SIGN_IN:
    case t.AUTH_SIGN_UP:
      authStore.signInOrUp(action.payload.token,action.payload.name)
      break;
    case t.AUTH_SIGN_OUT:
      authStore.signOut()
      break;
    case t.AUTH_ERROR:
      authStore.Error(action.payload)
      break;
    case t.AUTH_VALIDATE_SIGN_UP:
      store.validateSignUp();
      break;
  }
  return next(null, action);
}


