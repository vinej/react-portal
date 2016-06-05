import * as t from '../types/user_types';
import { reducePageAction } from './page_reducer';

export default function(action, next) {

  if (!action.type.startsWith("user_")) { 
    return next(null, action);
  }

  // do the specific actions first, this way
  // you can easily override the base action
  const store = action.store;
  switch(action.type) {
    case t.USER_VALIDATE:
      // do something special with this one
      return next(null, action);
  }
  
  reducePageAction(action);

  return next(null, action);
}