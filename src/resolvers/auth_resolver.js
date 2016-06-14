import * as t from '../types/auth_types';
import { authStore } from '../stores/auth_store';
import { authSetAuthorizations } from '../actions/auth_actions';

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
      authStore.Error(action.payload, action.render)
      break;
    case t.AUTH_VALIDATE_SIGN_UP:
      store.validateSignUp();
      break;
  }
  return next(null, action);
}


