import * as t from '../types/todo_types';
import { reduceBaseAction } from './base_reducer';

export default function(action, next) {

  if (!action.type.startsWith("todo_")) { 
    return next(null, action);
  }

  // do the specific action first, this way
  // you can easily override the base action
  const store = action.store;
  switch(action.type) {
    case t.TODO_SET_ALL:
      // do something special with this one
      // add fake todos if payload is empty
      if (action.payload.length == 0) {
        var list = [];
        for(var i = 0; i < 100; i++) {
          list.push( { "_id": `${i}`, "description":`Fake todo ${i}`, "status":"waiting" } );
        }
        action.payload = list;
      }
      break; // do the base action, do not return
    case t.TODO_VALIDATE:
      // do something special with this one
      // TODO
      return next(null, action);
  }

  reduceBaseAction(action)
  return next(null, action);
}