import { dispatch } from '../helpers/dispatcher'
import { authService } from '../services/auth_service'
import { AUTH_CHECK_TOKEN } from '../types/auth_types'

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

export function authorization(action, next){
  // need to verify if the user can exexcute the action
  // for the current project. The same validation must be
  // done in the backend.
  // Note, autorization are not saved into the localStorage
  // because we want to checked them more often
  if (action.type !== AUTH_CHECK_TOKEN && !authService.isActionAvailable(action)) {
    return next("Access denied", action);
  } else {
    return next(null, action);
  }
}
