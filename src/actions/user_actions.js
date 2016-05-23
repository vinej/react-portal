import { userService } from '../services/user_service';
import * as t from '../types/user_types';

export function userNextPage(store) {
  return {
    type: t.USER_NEXT_PAGE,
    store: store
  };
}

export function userPreviousPage(store) {
  return {
    type: t.USER_PREVIOUS_PAGE,
    store: store
  };
}

export function userDelete(store,user) {
  return  {
    type: t.USER_DELETE,
    store: store,
    payload: user
  };
}

export function userGetAll(store) {
  return function(dispatch) {
    userService.getAll(dispatch,store);
  };
} 

export function userSetAll(store, data) {
  return {
    type: t.USER_SET_ALL, 
    store : store,
    payload: data 
  }
}

export function userError(store, error) {
  return {
    type: t.USER_ERROR, 
    store : store,
    payload : error 
  }
}
