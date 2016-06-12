export function thunkResolver(action, next) {
  if (typeof action.payload === 'function') {
    return action.payload();
  } else {
    return next(null, action);
  }
}
