import * as t from '../types/auth_types';
import { authService } from '../services/auth_service';

export function authSignIn({ email, password }) {
  return function(dispatch) {
    authService.signIn(dispatch, { email, password });
  };
}

export function authSignUp({ email, password, name }) {
  return function(dispatch) {
    authService.signUp(dispatch, { email, password, name });
  };
}

export function authCheckToken() {
  return {
    type: t.AUTH_CHECK_TOKEN
  };
}

export function authSignInUp(token, name) {
  return {
    type: t.AUTH_SIGN_IN_UP,
    payload: { token, name }
  };
}

export function authSignOut() {
  return { type: t.AUTH_SIGN_OUT };
}

export function authValidateSignUp(store) {
  return { 
    type: t.AUTH_VALIDATE_SIGN_UP,
    store: store 
  };
}

export function authValidateSignIn(store) {
  return { 
    type: t.AUTH_VALIDATE_SIGN_IN,
    store: store 
  };
}

export function authError(error) {
  return {
    type: t.AUTH_ERROR, 
    payload : error 
  }
}
