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
import testResolver               from '../resolvers/test_resolver';

/**
 * We have 3 type of resolvers
 *   pre  : pre resolver to manage the action before a fonctionnal resolver do something with it
 *   std  : std resolver are standard resolver
 *   post : post resolver are resolvers that run after all others
 *
 * We use pre filled dictionnaries of resolvers by action type 
 * because we want to be sure that only resolvers that want to do
 * something with the action will going to be called.
 *
 * like that the dispatcher is scalable.
 * 
 */
class Dispatcher {
  constructor() {
    this.postResolvers = {}
    this.preResolvers = {}
    this.stdResolvers = {}

    this.postResolversAll = []
    this.preResolversAll = []
    this.stdResolversAll = []
  }

  addResolver( allDict, dict, resolver ) {
    if (resolver.filter === "*") {
      allDict.push(resolver.fct)
    } else {
      const actionTypes = resolver.filter.split(',')
      actionTypes.forEach( (actionType) => {
        if (!dict[actionType]) {
          dict[actionType] = []
        }
        dict[actionType].push(resolver.fct)
      })
    }
  }

  addPreResolver(resolver) {
    this.addResolver(this.preResolversAll, this.preResolvers, resolver)
  }

  addPostResolver(resolver) {
    this.addResolver(this.postResolversAll, this.postResolvers, resolver)
  }

  addStdResolver(resolver) {
    this.addResolver(this.stdResolversAll, this.stdResolvers, resolver)
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
    const action_type = action.type.substring(0, action.type.indexOf("_"));

    // do pre resolvers with filter *
    for(let resolver of this.preResolversAll) {
      action = resolver(action, this.next);
      if (!action) return;
    }    

    // do pre resolvers with others filters 
    if (this.preResolvers[action_type]) {
      for(let resolver of this.preResolvers[action_type]) {
        action = resolver(action, this.next);
        if (!action) return;
      }    
    }

    // do standard resolvers with filter *
    for(let resolver of this.stdResolversAll) {
      action = resolver(action, this.next);
      if (!action) return;
    }    

    // do standard resolvers with others filters
    if (this.stdResolvers[action_type]) {
      for(let resolver of this.stdResolvers[action_type]) {
        action = resolver(action, this.next);
        if (!action) return;
      }    
    }

    // do post resolvers for filter *
    for(let resolver of this.postResolversAll) {
      action = resolver(action, this.next);
      if (!action) return;
    }    

    // do post resolvers for others filters
    if (this.postResolvers[action_type]) {
      for(let resolver of this.postResolvers[action_type]) {
        action = resolver(action, this.next);
        if (!action) return;
      } 
    }
  }
}

 

export let dispatcher = new Dispatcher();
// logger first
dispatcher.addPreResolver( { fct: loggerResolver,         filter: "*" })
// Authorization second
dispatcher.addPreResolver( { fct: authorizationResolver,  filter: "*" })
//thunk third
dispatcher.addPreResolver( { fct: thunkResolver,          filter: "*" })

// no special order for those
dispatcher.addStdResolver( { fct: popupResolver,          filter: "popup" })
dispatcher.addStdResolver( { fct: tabbarResolver,         filter: "tabbar,dashboard" })
dispatcher.addStdResolver( { fct: dashboardResolver,      filter: "tabbar,dashboard" })
dispatcher.addStdResolver( { fct: authResolver,           filter: "auth" })
dispatcher.addStdResolver( { fct: messageResolver,        filter: "message" })
dispatcher.addStdResolver( { fct: userResolver,           filter: "user" })
dispatcher.addStdResolver( { fct: todoResolver,           filter: "todo" })

// logger last, post log. we set the test resolver for unit test
// dispatcher.addPostResolver( { fct: loggerResolver,        filter: "*" })
dispatcher.addPostResolver( { fct: testResolver,          filter: "*" })

export const dispatch = dispatcher.dispatch.bind(dispatcher)

