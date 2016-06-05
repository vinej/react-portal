import * as t from '../types/todo_types';
import { reducePageAction } from './page_reducer';

export default function(action, next) {

  if (!action.type.startsWith("todo_")) { 
    return next(null, action);
  }

  // do the specific action first, this way
  // you can easily override the base action
  const store = action.store;
  switch(action.type) {
    case t.TODO_VALIDATE:
      // do something special with this one
      // TODO
      return next(null, action);
  }

  reducePageAction(action)
  return next(null, action);
}