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
      })};
      break;
    case t.AUTH_SIGN_IN_UP:
<<<<<<< HEAD
				localStorage.setItem('token', action.payload.token);
				localStorage.setItem('name', action.payload.name);
        transaction( () => {
          authStore.authenticated = true;
          authStore.name = action.payload.name;
          authStore.errorMessage = '';
=======
			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('name', action.payload.name);
      transaction( () => {
      	authStore.authenticated = true;
      	authStore.name = action.payload.name;
>>>>>>> origin/master
      });
			browserHistory.push('/feature');
      break;
    case t.AUTH_SIGN_OUT:
    	localStorage.removeItem('token');
	    localStorage.removeItem('name');
      transaction(() => {
<<<<<<< HEAD
          authStore.authenticated = false;
          authStore.name = '';
          authStore.errorMessage = '';
          authFormStore.email = '';
          authFormStore.name = '';
          authFormStore.password = '';
          authFormStore.passwordConfirm = '';
=======
        authStore.authenticated = false;
        authStore.name = '';
>>>>>>> origin/master
      });
      break;
    case t.AUTH_ERROR:
      transaction(() => {
<<<<<<< HEAD
          if (typeof action.payload === 'object') {
            authStore.errorMessage = action.payload.error;
          } else {
            authStore.errorMessage = action.payload;
          }
          authStore.authenticated = false;
          authStore.name = '';
=======
        authStore.errorMessage = action.payload;
        authStore.authenticated = false;
        authStore.name = '';
>>>>>>> origin/master
      });
      break;
  }
  return state;
}
