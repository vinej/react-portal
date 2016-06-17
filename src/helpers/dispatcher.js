import { thunkResolver }          from '../resolvers/thunk_resolver';
import { loggerResolver }         from '../resolvers/logger_resolver';
import { authorizationResolver }  from '../resolvers/authorization_resolver';
import { popupResolver }          from '../resolvers/popup_resolver';
import { tabbarResolver }         from '../resolvers/tabbar_resolver';

import authResolver               from '../resolvers/auth_resolver';
import userResolver               from '../resolvers/user_resolver';
import todoResolver               from '../resolvers/todo_resolver';
import messageResolver            from '../resolvers/message_resolver';
import dashboardResolver          from '../resolvers/dashboard_resolver';

class Dispatcher {
  constructor() {
    this.resolvers = []
  }

  addResolver(resolver) {
    this.resolvers.push(resolver)
  }

  next(err, result) {
    if (err) {
      console.log("Error:",err)
      return null
    } else {
      return result
    }
  }

  dispatch(action) {
    for(let resolver of this.resolvers) {
      action = resolver(action, this.next);
      if (!action) break;
    }    
  }
}

export let dispatcher = new Dispatcher();
// logger first
dispatcher.addResolver(loggerResolver)
// Authorization second
dispatcher.addResolver(authorizationResolver)
//thunk third
dispatcher.addResolver(thunkResolver)

// no special order for those
dispatcher.addResolver(tabbarResolver)
dispatcher.addResolver(dashboardResolver)
dispatcher.addResolver(authResolver)
dispatcher.addResolver(messageResolver)
dispatcher.addResolver(userResolver)
dispatcher.addResolver(todoResolver)
dispatcher.addResolver(popupResolver)

export const dispatch = dispatcher.dispatch.bind(dispatcher)
