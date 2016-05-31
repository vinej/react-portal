import { AUTH_CHECK_TOKEN, AUTH_SET_ACTIONS } from '../types/auth_types'
import { authStore } from '../stores/auth_store'
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { popupStore } from '../stores/popup_store';
import { transaction } from 'mobx';

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
    //var mid = `#popup${popupStore.getCurrentId()-1}`;
    //ReactDOM.render( <span />, document.querySelector(mid))
    popupStore.close()
  } else if (type === 'edit_form') {
    // show the popup
    popupStore.show()
    // fill the div with the component
    const store = popupStore.getCurrentStore()
    transaction( () => {
      store.width = action.payload.dimension.width;
      store.height = action.payload.dimension.height;
      store.left = action.payload.dimension.left;
      store.top = action.payload.dimension.top;
    });
    // we need a setTimeout, because witout it the
    // render of the component will be done before 
    // the render of the div that will contains the
    // component. 1 millisecond is enouf to let the
    // other render to finish
    setTimeout( () => 
      ReactDOM.render( 
        action.payload.component , 
        document.querySelector(`#popup${popupStore.getCurrentId()}`)),
    1)
  } else {
    return next(null, action);
  }
}
