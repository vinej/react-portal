import * as t from '../types/auth_types';
import { transaction } from 'mobx';
import { authStore } from '../stores/auth_store';
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
      })};
      break;
    case t.AUTH_SIGN_IN_UP:
	localStorage.setItem('token', action.payload.token);
	localStorage.setItem('name', action.payload.name);
        transaction( () => {
          authStore.authenticated = true;
          authStore.name = action.payload.name;
      });
			browserHistory.push('/feature');
      break;
    case t.AUTH_SIGN_OUT:
    	localStorage.removeItem('token');
	    localStorage.removeItem('name');
      transaction(() => {
          authStore.authenticated = false;
          authStore.name = '';
      });
      break;
    case t.AUTH_ERROR:
      transaction(() => {
          authStore.errorMessage = action.payload;
          authStore.authenticated = false;
          authStore.name = '';
      });
      break;
  }

  return state;
}
