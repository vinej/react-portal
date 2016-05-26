import authReducer from '../reducers/auth_reducer';
import userReducer from '../reducers/user_reducer';
import todoReducer from '../reducers/todo_reducer';
import messageReducer from '../reducers/message_reducer';

function thunk(action, next) {
  if (typeof action === 'function') {
    return action(dispatch);
  } else {
    return next(null, action);
  }
}

function logger(action, next) {
  if (typeof action !== 'function') {
    console.log("action", action);
  }
  return next(null, action);
}

function actiontag(action, next) {
  if (typeof action !== 'function') {
    action.tag = 1;
    console.log("action", action.type);
  }
  return next(null, action);
}

class Dispatcher {
  constructor() {
    //this.dispatch = null;
    this.all = null;
    this.reducers = [];
    this.middlewares = [];
  }

  addReducer(reducer) {
    this.reducers.push(reducer);
  }

  // middle ware a called first
  addMiddleware( middleware) {
    this.middlewares.push(middleware);
  }

  getDispatch() {
    if (this.dispatch == null) {
      this.buildDispatch(); 
    }
    return this.dispatch;
  }

  buildDispatch() {
    this.all = [...this.middlewares, ...this.reducers];
    //this.dispatch = this.compose(all);
    //this.dispatch = seq(...this.middlewares, ...this.reducers);
  }

  next(err, result) {
    if (err) {
      console.log("Error:",err);
      return null;
    } else {
      return result;
    }
  }

  dispatch(action) {
    var result = action;
    for(var i = 0; i < this.all.length; i++) {
      action = this.all[i](action, this.next);
      if (!action) break;
    }
  }
}

export let dispatcher = new Dispatcher();
//dispatcher.addMiddleware(actiontag)
//dispatcher.addMiddleware(logger)
dispatcher.addMiddleware(thunk)
dispatcher.addReducer(authReducer)
dispatcher.addReducer(messageReducer)
dispatcher.addReducer(userReducer)
dispatcher.addReducer(todoReducer)
dispatcher.buildDispatch();

export const dispatch = dispatcher.dispatch.bind(dispatcher)




