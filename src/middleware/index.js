import { dispatch } from '../helpers/dispatcher';

export function thunk(action, next) {
  if (typeof action.payload === 'function') {
    return action.payload(dispatch);
  } else {
    return next(null, action);
  }
}

export function logger(action, next) {
  console.log("action", action.type, action);
  return next(null, action);
}

