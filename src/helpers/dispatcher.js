import { thunkMiddleware } from '../middlewares/thunk_middleware';
import { loggerMiddleware } from '../middlewares/logger_middleware';
import { authorizationMiddleware } from '../middlewares/authorization_middleware';
import { popupMiddleware } from '../middlewares/popup_middleware';
import { tabBarMiddleware } from '../middlewares/tabbar_middleware';

import authReducer from '../reducers/auth_reducer';
import userReducer from '../reducers/user_reducer';
import todoReducer from '../reducers/todo_reducer';
import messageReducer from '../reducers/message_reducer';

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

  buildDispatch() {
    this.all = [...this.middlewares, ...this.reducers];;
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
    for(var i = 0; i < this.all.length; i++) {
      action = this.all[i](action, this.next);
      if (!action) break;
    }
  }
}

export let dispatcher = new Dispatcher();
// logger first
dispatcher.addMiddleware(loggerMiddleware)
// Authorization second
dispatcher.addMiddleware(authorizationMiddleware)
//thunk third
dispatcher.addMiddleware(thunkMiddleware)
// edit / cancel form
dispatcher.addMiddleware(popupMiddleware)
// tabbar management
dispatcher.addMiddleware(tabBarMiddleware)

// The order of reducers is not important
dispatcher.addReducer(authReducer)
dispatcher.addReducer(messageReducer)
dispatcher.addReducer(userReducer)
dispatcher.addReducer(todoReducer)
dispatcher.buildDispatch();

export const dispatch = dispatcher.dispatch.bind(dispatcher)
