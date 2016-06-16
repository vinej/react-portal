import * as t from '../types/auth_types';
import { authService } from '../services/auth_service';

export function authSetAuthorizations(mainComponentsToRender) {
  return {
    type: t.AUTH_SET_AUTHORIZATIONS,
    payload: function() {
      authService.setAuthorizations(mainComponentsToRender, authSetAuthorizationsIt , authError);
    }
  }
}

export function authSetAuthorizationsIt(mainComponentsToRender, authorizations) {
  return {
    type: t.AUTH_SET_AUTHORIZATIONS,
    render: mainComponentsToRender,
    payload: authorizations
  }
}

export function authSignIn({ email, password }) {
  return {
    type: t.AUTH_SIGN_IN,
    payload: function() {
      authService.signIn({ email, password }, authSignInIt, authError)
    }
  }
}

export function authSignUp({ email, password, name }) {
  return {
    type: t.AUTH_SIGN_UP,
    payload : function() {
      authService.signUp({ email, password, name }, authSignUpIt, authError)
    }
  }
}

export function authCheckToken(mainComponentsToRender) {
  return {
    type: t.AUTH_CHECK_TOKEN,
    render: mainComponentsToRender
  }
}

export function authSignInIt(token, name) {
  return {
    type: t.AUTH_SIGN_IN,
    payload: { token, name }
  }
}

export function authSignUpIt(token, name) {
  return {
    type: t.AUTH_SIGN_UP,
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
  }
}

export function authValidateSignIn(store) {
  return { 
    type: t.AUTH_VALIDATE_SIGN_IN,
    store: store 
  }
}

export function authError(error, mainComponentsToRender) {
  return {
    type: t.AUTH_ERROR, 
    render: mainComponentsToRender,
    payload : error 
  }
}
