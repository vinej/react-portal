import { AUTH_CHECK_TOKEN, AUTH_SET_ACTIONS } from '../types/auth_types'
import { authStore } from '../stores/auth_store'
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

export function thunk(action, next) {
  if (typeof action.payload === 'function') {
    return action.payload();
  } else {
    return next(null, action);
  }
}

export function logger(action, next) {
  console.log("action", action.type, action);
  return next(null, action);
}

export function authorization(action, next) {
  // need to verify if the user can exexcute the action
  // for the current project. The same validation must be
  // done in the backend.
  // Note, autorization are not saved into the localStorage
  // because we want to checked them more often
  // 
  if ( action && action.type && !action.type.startsWith("auth_") && 
      !authStore.isActionAvailable(action.type)) {
    return next("Access denied", action);
  } else {
    return next(null, action);
  }
}

export function editCancelForm(action, next) {
  const idx = action.type.indexOf("_")
  const type = action.type.substring(idx+1)

  if (type === 'cancel_form') {
    ReactDOM.render( <span />, document.querySelector('#popup'))
    document.querySelector('#popup').style.visibility='hidden';
  } else if (type === 'edit_form') {
    document.querySelector('#popup').style.visibility='visible';
    ReactDOM.render( action.payload , document.querySelector('#popup'))
  } else {
    return next(null, action);
  }
}
