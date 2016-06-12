export function loggerResolver(action, next) {
  console.log("action", action.type, action);
  return next(null, action);
}

