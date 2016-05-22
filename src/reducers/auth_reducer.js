import * as t from '../types/auth_types';
import { transaction } from 'mobx';
import { authStore, authFormStore } from '../stores/auth_store';
import { browserHistory } from 'react-router';

export default function(state = {}, action) {
  switch(action.type) {
    case t.AUTH_CHECK_TOKEN:
      const token = localStorage.getItem('token');
      if (token) {
        const name = localStorage.getItem('name');
        transaction( () => {
          authStore.authenticated = true;
          authStore.name = name;
          authStore.errorMessage = '';
          browserHistory.push('/dashboard');
        })
      };
      break;
    case t.AUTH_SIGN_IN_UP:
			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('name', action.payload.name);
      transaction( () => {
        authStore.authenticated = true;
        authStore.name = action.payload.name;
        authStore.errorMessage = '';
      });
			browserHistory.push('/dashboard');
      break;
    case t.AUTH_SIGN_OUT:
    	localStorage.removeItem('token');
	    localStorage.removeItem('name');
      transaction(() => {
        authStore.authenticated = false;
        authStore.name = '';
        authStore.errorMessage = '';
      });
      break;
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
      break;
    case t.AUTH_VALIDATE_SIGN_UP:
      store.validateSignUp();
  }
  return state;
}


