import * as t from '../types/auth_types';
import { authService } from '../services/auth_service';

export function authSetActions(render) {
  return {
    type: t.AUTH_SET_ACTIONS,
    payload: function() {
      authService.setActions(render, authSetActionsIt , authError);
    }
  }
}

export function authSetActionsIt(render, actions) {
  return {
    type: t.AUTH_SET_ACTIONS,
    render: render,
    payload: actions
  }
}

export function authSignIn({ email, password }) {
  return {
    type: t.AUTH_SIGN_IN_,
    payload: function() {
      authService.signIn({ email, password }, authSignInIt, authError);
    }
  }
}

export function authSignUp({ email, password, name }) {
  return {
    type: t.AUTH_SIGN_UP_,
    payload : function() {
      authService.signUp({ email, password, name }, authSignUpIt, authError);
    }
  }
}

export function authCheckToken(render) {
  return {
    type: t.AUTH_CHECK_TOKEN,
    render: render
  };
}

export function authSignInIt(token, name) {
  return {
    type: t.AUTH_SIGN_IN,
    payload: { token, name }
  };
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
