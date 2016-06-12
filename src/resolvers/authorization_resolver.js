import { authStore } from '../stores/auth_store'

export function authorizationResolver(action, next) {
  // need to verify if the user can exexcute the action
  // for the current project. The same validation must be
  // done in the backend.
  // Note, autorization are not saved into the localStorage
  // because we want to checked them more often
  // 
  if ( action && action.type && !action.type.startsWith("auth_") && 
      !authStore.isActionAvailable(action.type)) {
    return next("Access denied", action);
  } else {
    return next(null, action);
  }
}

